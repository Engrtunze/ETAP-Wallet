import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { JwtStrategy } from './auth-strategy/jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { UserMapper } from 'src/mappers/user.mapper';
import { LocalStrategy } from './auth-strategy/local-strategy';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') ||
          crypto.randomBytes(32).toString('hex'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, UserMapper, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
