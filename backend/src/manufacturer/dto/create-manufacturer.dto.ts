import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  rc: string;

  @IsPhoneNumber()
  phone: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}
