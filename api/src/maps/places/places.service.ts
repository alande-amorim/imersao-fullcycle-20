import { Injectable } from '@nestjs/common';
import {
  Client as GoogleMapsClient,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
  constructor(
    private googleMapsClient: GoogleMapsClient,
    private config: ConfigService,
  ) {}

  async findPlaces(text: string) {
    try {
      const { data } = await this.googleMapsClient.findPlaceFromText({
        params: {
          input: text,
          inputtype: PlaceInputType.textQuery,
          fields: ['place_id', 'formatted_address', 'geometry'],
          key: this.config.get('GOOGLE_MAPS_API_KEY'),
        },
      });
      return data;
    } catch (err) {
      console.dir(err);
    }
  }
}
