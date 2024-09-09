import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  key?: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
