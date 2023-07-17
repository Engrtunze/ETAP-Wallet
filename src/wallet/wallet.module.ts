import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Wallet } from './wallet.entity';
import { WalletMapper } from 'src/mappers/wallet.mapper';

@Module({
  imports: [
    MikroOrmModule.forFeature([Wallet]),
    ConfigModule,
    UserModule,
    JwtModule,
    AuthModule,
  ],
  providers: [WalletService, WalletMapper],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
