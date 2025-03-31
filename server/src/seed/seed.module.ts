import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { HallModule } from "../hall/hall.module";
import { SeatModule } from "../seat/seat.module";
import { MoviesModule } from "../movies/movies.module";
import { ScreeningModule } from "../screening/screening.module";
import { BookingModule } from "../booking/booking.module";

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PrismaModule,
    HallModule,
    SeatModule,
    MoviesModule,
    ScreeningModule,
    BookingModule,
  ],
})
export class SeedModule {}
