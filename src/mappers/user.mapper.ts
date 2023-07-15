import { Injectable } from '@nestjs/common';
import { UserCreatedDto } from '../user/dto/user-created.dto';
import { User } from '../user/user.entity';
import { AdminCreateUserDto } from 'src/user/dto/admin-create-user.dto';
import { AdminUserCreatedDto } from 'src/user/dto/admin-user-created.dto';

@Injectable()
export class UserMapper {
  mapToUserCreatedDto(user: User): UserCreatedDto {
    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      transactionPin,
      isAdmin,
      createdAt,
      updatedAt,
    } = user;

    const userCreatedDto: UserCreatedDto = {
      id,
      firstName,
      lastName,
      email,
      phone,
      transactionPin,
      isAdmin,
      createdAt,
      updatedAt,
    };

    return userCreatedDto;
  }

  mapToAdminUserCreatedDto(user: User): AdminUserCreatedDto {
    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      transactionPin,
      isAdmin,
      createdAt,
      updatedAt,
    } = user;
    const plainPassword = 'Password@123';

    const adminUserCreatedDto: AdminUserCreatedDto = {
      id,
      firstName,
      lastName,
      email,
      phone,
      transactionPin,
      isAdmin,
      password: plainPassword,
      createdAt,
      updatedAt,
    };

    return adminUserCreatedDto;
  }
}
