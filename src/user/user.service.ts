import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCreatedDto } from './dto/user-created.dto';
import { DataConflictException } from 'src/exceptions/DataConflictException';
import * as bcrypt from 'bcrypt';
import { UserMapper } from 'src/mappers/user.mapper';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import Role from '../enum/role.enum';
import { DecodeToken } from 'src/util/jwt-decode-token';
import { JwtService } from '@nestjs/jwt';
import { CreateTransactionPinDto } from './dto/creat-transaction-pin.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
    private jwtService: JwtService,
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
  async findUserById(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne(userId);
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async adminCreateUser(request: AdminCreateUserDto): Promise<UserCreatedDto> {
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
        role: Role.User,
        transactionPin: '',
      });

      return this.userMapper.mapToAdminUserCreatedDto(nonAdminUser);
    } catch (err) {
      throw new DataConflictException(err.message);
    }
  }

  async createTransactionPin(
    userId: string,
    pin: CreateTransactionPinDto,
  ): Promise<string> {
    const req = await DecodeToken.getUserIdFromToken(this.jwtService, userId);
    const userData = await this.findUserById(req);
    if (userData.transactionPin) {
      throw new BadRequestException('pin already created');
    }
    const salt = await bcrypt.genSalt();
    const hashedPin = await bcrypt.hash(pin.transactionPin, salt);
    userData.transactionPin = hashedPin;
    await this.userRepository.createUser(userData);
    return 'transaction pin created successfully';
  }
}
