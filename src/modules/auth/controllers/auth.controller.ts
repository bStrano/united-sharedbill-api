import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { LoginWithProviderDto } from '@app/modules/auth/dtos/login-with-provider.dto';
import { Public } from '@app/modules/auth/decorators/public-route.decorator';

@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  loginWithGoogle(@Body() loginWithProviderDto: LoginWithProviderDto) {
    return this.authService.loginWithGoogle(loginWithProviderDto.token);
  }
}
