import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}