import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCreatedDto } from './dto/user-created.dto';
import { DataConflictException } from 'src/exceptions/DataConflictException';
import * as bcrypt from 'bcrypt';
import { UserMapper } from 'src/mappers/user.mapper';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async create(request: CreateUserDto) {
    const user = this.userRepository.create(request);
    return this.userRepository.createUser(user);
  }

  async findUser(phone: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ phone: phone });
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async AdminCreateUser(request: AdminCreateUserDto): Promise<UserCreatedDto> {
    try {
      const user = await this.findUser(request.phone);
      if (user) {
        throw new DataConflictException('This user already exists');
      }
      const pass = 'Password@123';
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(pass, salt);

      const nonAdminUser = await this.create({
        ...request,
        password: hashedPassword,
        isAdmin: false,
        transactionPin: 'empty',
      });

      return this.userMapper.mapToAdminUserCreatedDto(nonAdminUser);
    } catch (err) {
      throw new DataConflictException(err.message);
    }
  }
}
