import { Body, Controller, Delete, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionService } from '@app/modules/auth/services/session.service';
import { DeleteSessionDto } from '@app/modules/auth/dtos/delete-session.dto';
import { RefreshSessionDto } from '@app/modules/auth/dtos/refresh-session.dto';
import { Public } from '@app/modules/auth/decorators/public-route.decorator';

@Controller('session')
@ApiTags('Session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Delete()
  @Public()
  logout(@Body() deleteSessionDto: DeleteSessionDto) {
    return this.sessionService.deleteSession(deleteSessionDto.refreshToken);
  }

  @Patch()
  @Public()
  refreshSession(@Body() deleteSessionDto: RefreshSessionDto) {
    return this.sessionService.refreshSession(deleteSessionDto.refreshToken);
  }
}
