import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreateTransactionDtoInterface,
  ParticipantAmountInterface,
} from 'libs/united-sharedbill-core/src/modules/transactions/dtos/create-transaction.dto.interface';
import { IconsEnum } from '../../../../libs/united-sharedbill-core/src/shared/enums/icons.enum';
import { TransactionTypeEnum } from '../../../../libs/united-sharedbill-core/src/modules/transactions/enums/transaction-type.enum';

export class ParticipantAmount implements ParticipantAmountInterface {
  @ApiProperty()
  @IsNumber()
  value: number;
  @ApiProperty({ example: '146baa3b-ed24-4c00-98ec-2380da519aa3' })
  @IsUUID('4')
  participantId: string;
}

export class CreateExpenseDto implements CreateTransactionDtoInterface {
  userId: string;
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty({ enum: IconsEnum })
  @IsEnum(IconsEnum)
  icon: IconsEnum;
  @ApiProperty({ example: 100 })
  @IsNumber()
  total: number;
  @ApiProperty({ example: '243c27cb-fdae-46f8-bbb4-06972d623fab' })
  @IsUUID('4')
  groupId: string;
  @ApiProperty({ isArray: true, type: ParticipantAmount })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ParticipantAmount)
  owners: ParticipantAmount[];
  @ApiProperty({ isArray: true, type: ParticipantAmount })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ParticipantAmount)
  @ValidateNested({ each: true })
  @Type(() => ParticipantAmount)
  debtors: ParticipantAmount[];
  @ApiProperty({ enum: TransactionTypeEnum })
  @IsEnum(TransactionTypeEnum)
  transactionType: TransactionTypeEnum;
}
