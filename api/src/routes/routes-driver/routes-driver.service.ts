import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type ProcessRouteDTO = {
  route_id: string;
  lat: number;
  lng: number;
};

@Injectable()
export class RoutesDriverService {
  constructor(private readonly prisma: PrismaService) {}

  processRoute(dto: ProcessRouteDTO) {
    return this.prisma.routeDriver.upsert({
      include: { route: true },
      where: { route_id: dto.route_id },
      update: {
        points: {
          push: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
      create: {
        route_id: dto.route_id,
        points: {
          set: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
    });
  }
}
