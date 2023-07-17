import { JwtService } from '@nestjs/jwt';

export class DecodeToken {
  static async getUserIdFromToken(
    jwtService: JwtService,
    token: string,
  ): Promise<string> {
    const decodedToken = jwtService.decode(token);
    return decodedToken.sub;
  }
}
