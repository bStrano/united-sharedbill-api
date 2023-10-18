import { IsEmail, IsIn, IsString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterUserWithOAuthDto {
  @ApiProperty()
  @IsIn(['google.com'])
  providerId: string;
  @IsString()
  @ApiProperty()
  oauthId: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiPropertyOptional()
  @IsUrl()
  avatar?: string;
}
