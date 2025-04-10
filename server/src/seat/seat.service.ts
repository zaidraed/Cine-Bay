import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { Seat, Hall, Prisma } from "@prisma/client";
@Injectable()
export class SeatService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSeatDto) {
    // Verificar si el asiento ya existe
    const existingSeat = await this.prisma.seat.findFirst({
      where: {
        number: data.number,
        row: data.row,
        hallId: data.hallId,
      },
    });

    if (existingSeat) {
      throw new Error(
        `Seat ${data.row}${data.number} already exists in this hall`
      );
    }

    return this.prisma.seat.create({ data });
  }

  async createBulk(dataArray: CreateSeatDto[]) {
    const createdSeats: Seat[] = []; // Explicitly type the array as Seat[]

    for (const data of dataArray) {
      try {
        const seat = await this.create(data);
        createdSeats.push(seat);
      } catch (error) {
        // Continuar con el siguiente asiento si hay error
        console.error(
          `Error creating seat ${data.row}${data.number}: ${error.message}`
        );
      }
    }

    return createdSeats;
  }

  async generateHallSeats(hallId: string) {
    // Verify hall exists
    const hall = await this.prisma.hall.findUnique({
      where: { id: hallId },
    });

    if (!hall) {
      throw new NotFoundException(`Hall with ID ${hallId} not found`);
    }

    // Delete existing seats first
    await this.prisma.seat.deleteMany({
      where: { hallId },
    });

    // Generate seats configuration
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const seatsPerRow = Math.ceil(hall.capacity / rows.length);

    // Explicitly type the seats data
    const seatsToCreate: Prisma.SeatCreateManyInput[] = rows.flatMap((row) =>
      Array.from({ length: seatsPerRow }, (_, i) => ({
        row,
        number: i + 1,
        hallId,
        isActive: true,
      }))
    );

    // Create all seats in a single transaction
    return this.prisma.$transaction([
      this.prisma.seat.createMany({
        data: seatsToCreate,
      }),
      this.prisma.hall.update({
        where: { id: hallId },
        data: { seatsGenerated: true },
      }),
    ]);
  }
  findAll() {
    return this.prisma.seat.findMany();
  }

  findByHall(hallId: string) {
    return this.prisma.seat.findMany({
      where: { hallId },
      orderBy: [{ row: "asc" }, { number: "asc" }],
    });
  }

  async findAvailableSeats(screeningId: string) {
    // Primero encontrar la sala asociada a esta proyección
    const screening = await this.prisma.screening.findUnique({
      where: { id: screeningId },
      select: { hallId: true },
    });

    if (!screening) {
      throw new NotFoundException(`Screening with ID ${screeningId} not found`);
    }

    // Encontrar todos los asientos de la sala
    const allSeats = await this.prisma.seat.findMany({
      where: {
        hallId: screening.hallId,
        isActive: true,
      },
      orderBy: [{ row: "asc" }, { number: "asc" }],
    });

    // Encontrar asientos ya reservados para esta proyección
    const bookedSeatIds = await this.prisma.seatBooking.findMany({
      where: {
        booking: {
          screeningId,
          status: { notIn: ["CANCELLED"] },
        },
      },
      select: { seatId: true },
    });

    const bookedSeatIdSet = new Set(bookedSeatIds.map((b) => b.seatId));

    // Filtrar los asientos disponibles
    // Usamos el tipo explícito para evitar el error de TypeScript
    const availableSeats: Seat[] = allSeats.filter(
      (seat) => !bookedSeatIdSet.has(seat.id)
    );

    return availableSeats;
  }

  findOne(id: string) {
    return this.prisma.seat.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateSeatDto) {
    return this.prisma.seat.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.seat.delete({ where: { id } });
  }
}
