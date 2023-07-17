import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './config/database.module';
import { WalletModule } from './wallet/wallet.module';
import { PaymentServiceModule } from './payment-service/payment-service.module';
import { TransactionsModule } from './transactions/transactions.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    WalletModule,
    PaymentServiceModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// console.log(process.env.JWT_SECRET);
