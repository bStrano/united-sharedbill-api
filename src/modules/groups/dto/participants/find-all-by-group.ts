import { ApiProperty } from '@nestjs/swagger';

export class FindAllByGroup {
  @ApiProperty()
  groupId: string;
}
