import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly service: PlacesService) {}

  @Get()
  findPlaces(@Query('text') text: string) {
    return this.service.findPlaces(text);
  }
}
