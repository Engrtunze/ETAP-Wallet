import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { UserCreatedDto } from './dto/user-created.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { HasRoles } from 'src/auth/has-roles';
import Role from '../enum/role.enum';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create-user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'create non admin user' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.Admin)
  async createUser(
    @Body(ValidationPipe) request: AdminCreateUserDto,
  ): Promise<UserCreatedDto> {
    return this.userService.AdminCreateUser(request);
  }
}
