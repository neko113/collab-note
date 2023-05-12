import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('notes')
export class CreateNoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
