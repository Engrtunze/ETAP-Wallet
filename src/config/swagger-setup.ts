import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerOptions() {
  return new DocumentBuilder()
    .setTitle('ETAP-wallet documentation')
    .setDescription('etap-wallet documentation')
    .setVersion('1.0')
    .build();
}
