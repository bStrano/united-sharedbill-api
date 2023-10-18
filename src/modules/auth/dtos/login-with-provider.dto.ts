import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class LoginWithProviderDto {
  @ApiProperty()
  @IsString()
  token: string;
}
