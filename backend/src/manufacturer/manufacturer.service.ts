import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(private readonly prisma: PrismaService) {}

  async registerManufacturer(createManufacturerDto: CreateManufacturerDto) {
    const { name, address, email, rc, phone } = createManufacturerDto;

    try {
      return await this.prisma.manufacturer.create({
        data: {
          name,
          address,
          email,
          rc,
          phone,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Manufacturer with this email or name already exists'
        );
      }
      throw new InternalServerErrorException('Failed to register manufacturer');
    }
  }

  async getAllManufacturers() {
    try {
      return await this.prisma.manufacturer.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get manufacturers:',
        error
      );
    }
  }
}
