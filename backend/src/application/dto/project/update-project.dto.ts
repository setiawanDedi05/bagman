import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
