import { IsNotEmpty, IsString } from 'class-validator';

export class AsignToDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
