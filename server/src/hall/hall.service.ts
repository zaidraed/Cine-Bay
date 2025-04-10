import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateHallDto } from "./dto/update-hall.dto";
import { CreateHallDto } from "./dto/create-hall.dto";

@Injectable()
export class HallService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHallDto) {
    try {
      return await this.prisma.hall.create({ data });
    } catch (error) {
      console.error("Error en Prisma:", error);
      throw new InternalServerErrorException("Error en la base de datos");
    }
  }

  findAll() {
    return this.prisma.hall.findMany();
  }

  findOne(id: string) {
    return this.prisma.hall.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateHallDto) {
    return this.prisma.hall.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.hall.delete({ where: { id } });
  }
}
