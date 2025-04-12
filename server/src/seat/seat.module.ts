import { Module } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { SeatController } from "./seat.controller";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SeatController],
  providers: [SeatService, PrismaService],
  exports: [SeatService],
})
export class SeatModule {}
