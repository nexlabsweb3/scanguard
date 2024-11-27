import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class FlagProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
