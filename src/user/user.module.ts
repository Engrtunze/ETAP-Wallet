import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { UserMapper } from 'src/mappers/user.mapper';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserService, UserMapper],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
