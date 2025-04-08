import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { ObjectId } from "mongodb";
import { PrismaService } from "../prisma/prisma.service";

import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "@prisma/client";

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMovieDto) {
    const releaseDate = new Date(dto.releaseDate);
    if (isNaN(releaseDate.getTime())) {
      throw new BadRequestException("Invalid release date");
    }

    return this.prisma.movie.create({
      data: { ...dto, releaseDate },
    });
  }
  async findAll() {
    return this.prisma.movie.findMany;
    {
      orderBy: {
        releaseDate: "desc";
      }
    }
  }

  async findUpcoming(): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      where: {
        releaseDate: {
          gte: new Date(), // Solo películas con fecha de estreno en el futuro
        },
      },
      orderBy: {
        releaseDate: "asc", // Ordenar por fecha de estreno más cercana
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateMovieDto) {
    return this.prisma.movie.update({
      where: { id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.movie.delete({ where: { id } });
  }
  async findNowPlaying(): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      where: {
        releaseDate: {
          lte: new Date(), // Solo películas con fecha de estreno en el pasado
        },
      },
      orderBy: {
        releaseDate: "desc", // Ordenar por las más recientes primero
      },
    });
  }

  async validateIds(ids: string[]) {
    ids = Array.from(new Set(ids));

    const movies = await this.prisma.movie.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (movies.length !== ids.length)
      throw new NotFoundException("Some movies not found");

    return movies;
  }
}
