import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserWithOAuthDto } from '@app/modules/users/dtos/register-user';
import { UsersService } from '@app/modules/users/services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersControllers {
  constructor(private readonly usersService: UsersService) {}

  @Post('register/oauth')
  registerFromOAuthProvider(@Body() body: RegisterUserWithOAuthDto) {
    return this.usersService.registerFromOAuthProvider(body);
  }
}
