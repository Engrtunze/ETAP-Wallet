import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LogInUserDto } from '../user/dto/login.dto';
import { EntityManager } from '@mikro-orm/core';
import { JwtPayload } from './jwt-payload';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { DataConflictException } from 'src/exceptions/DataConflictException';
import { UserCreatedDto } from 'src/user/dto/user-created.dto';
import { UserMapper } from 'src/mappers/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  public async register(
    registrationData: CreateUserDto,
  ): Promise<UserCreatedDto> {
    try {
      const userExist = await this.userService.findUser(registrationData.phone);
      if (userExist) {
        throw new DataConflictException('This user already exists');
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(registrationData.password, salt);

      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
        isAdmin: true,
      });
      return this.userMapper.mapToUserCreatedDto(createdUser);
    } catch (err) {
      throw new DataConflictException(err.message);
    }
  }

  async login(request: LogInUserDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findUser(request.phone);
    if (user) {
      if (user && (await bcrypt.compare(request.password, user.password))) {
        const payload: JwtPayload = {
          phone: user.phone,
          sub: user.id,
          isAdmin: user.isAdmin,
        };
        const accessToken = this.jwtService.sign(payload);
        user.lastLoggedIn = new Date();
        await this.entityManager.persistAndFlush(user);
        return { accessToken };
      }
    }
    throw new UnauthorizedException('Invalid phone number or password.');
  }

  async validateUser(request: LogInUserDto): Promise<User> {
    const user = await this.userService.findUser(request.phone);

    if (user && (await bcrypt.compare(request.password, user.password))) {
      return user;
    }

    return null;
  }
}
