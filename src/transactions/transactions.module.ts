import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transactions } from './transactions.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { WalletModule } from '../wallet/wallet.module';
import { UserModule } from 'src/user/user.module';
import { PaymentServiceModule } from 'src/payment-service/payment-service.module';
@Module({
  imports: [
    MikroOrmModule.forFeature([Transactions]),
    JwtModule,
    WalletModule,
    UserModule,
    PaymentServiceModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
