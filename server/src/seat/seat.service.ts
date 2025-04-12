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
    try {
      // Configuración de asientos - ajusta según necesidades
      const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      const seatsPerRow = 10;

      // Generar datos de asientos según el schema
      const seatsData: Prisma.SeatCreateManyInput[] = [];

      rows.forEach((row, rowIndex) => {
        for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
          seatsData.push({
            number: rowIndex * seatsPerRow + seatNum, // Número único continuo
            row: row,
            hallId: hallId,
            isActive: true, // Campo requerido según schema
            // createdAt y updatedAt se generan automáticamente
          });
        }
      });

      // Crear asientos usando createMany
      const result = await this.prisma.seat.createMany({
        data: seatsData,
      });

      // Actualizar el estado de la sala
      await this.prisma.hall.update({
        where: { id: hallId },
        data: { seatsGenerated: true },
      });

      return {
        success: true,
        seatsCreated: result.count,
        message: `Se generaron ${result.count} asientos para la sala ${hallId}`,
      };
    } catch (error) {
      console.error("Error en generateHallSeats:", error);
      throw new Error("Error al generar los asientos");
    }
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
