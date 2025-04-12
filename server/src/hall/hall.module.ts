import { Module } from "@nestjs/common";
import { HallService } from "./hall.service";
import { HallController } from "./hall.controller";
import { PrismaService } from "../prisma/prisma.service";
import { SeatModule } from "../seat/seat.module";
import { PrismaModule } from "src/prisma/prisma.module";
@Module({
  imports: [PrismaModule, SeatModule],
  controllers: [HallController],
  providers: [HallService, PrismaService],
  exports: [HallService],
})
export class HallModule {}
