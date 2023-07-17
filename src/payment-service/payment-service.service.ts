import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateChargeRequestDto } from './dto/create-charge-request.dto';
import axios from 'axios';
import { url } from 'inspector';
import { PaystackChargeResponseDto } from './dto/paystackChargeResponse.dto';

@Injectable()
export class PaymentServiceService {
  private readonly baseUrl: string;
  private readonly paystackApiKey: string;
  constructor(private readonly configureService: ConfigService) {
    this.baseUrl = this.configureService.get('PAYSTACK_BASE_URL');
    this.paystackApiKey = this.configureService.get('PAYSTACK_API_KEY');
  }

  async paystackCharge(
    createChargeRequestDto: CreateChargeRequestDto,
  ): Promise<PaystackChargeResponseDto> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/charge`,
        createChargeRequestDto,
        {
          headers: {
            Authorization: `Bearer ${this.paystackApiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const responseData = response.data;
      const paystackResponse: PaystackChargeResponseDto = {
        ...responseData,
        status: responseData.status,
        message: responseData.message,
      };

      return paystackResponse;
    } catch (err) {
      console.error('Error:', err.message);
      throw new Error(
        'An error occurred while making the Paystack charge request.',
      );
    }
  }

  async verifyTransaction(
    reference: string,
  ): Promise<PaystackChargeResponseDto> {
    try {
      console.log(`${this.baseUrl}/${reference}`);
      const response = await axios.get(
        `${this.baseUrl}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.paystackApiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const responseData = response.data;
      const paystackResponse: PaystackChargeResponseDto = {
        ...responseData,
        status: responseData.status,
        message: responseData.message,
      };

      return paystackResponse;
    } catch (err) {
      console.error('Error:', err.message);
      throw new Error(
        'An error occurred while making the Paystack charge request.',
      );
    }
  }
}
