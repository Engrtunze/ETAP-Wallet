import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { UserCreatedDto } from './dto/user-created.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create-user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'create non admin user' })
  createUser(
    @Body(ValidationPipe) request: AdminCreateUserDto,
  ): Promise<UserCreatedDto> {
    return this.userService.AdminCreateUser(request);
  }
}
