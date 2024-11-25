import { Controller, Post, Body } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post('register')
  async registerManufacturer(
    @Body() createManufacturerDto: CreateManufacturerDto
  ) {
    return this.manufacturerService.registerManufacturer(createManufacturerDto);
  }
}
