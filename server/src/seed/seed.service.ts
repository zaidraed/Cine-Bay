import { Injectable } from "@nestjs/common";
import { HallService } from "../hall/hall.service";
import { SeatService } from "../seat/seat.service";
import { MoviesService } from "../movies/movies.service";
import { ScreeningService } from "../screening/screening.service";
import { BookingService } from "../booking/booking.service";
import { PrismaService } from "../prisma/prisma.service";
import { mockData } from "./data/data.mock";

@Injectable()
export class SeedService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hallService: HallService,
    private readonly seatService: SeatService,
    private readonly movieService: MoviesService,
    private readonly screeningService: ScreeningService,
    private readonly bookingService: BookingService
  ) {}

  async executeSeed() {
    await this.prismaService.seatBooking.deleteMany();
    await this.prismaService.seat.deleteMany();
    await this.prismaService.booking.deleteMany();
    await this.prismaService.screening.deleteMany();
    await this.prismaService.hall.deleteMany();
    await this.prismaService.movie.deleteMany();

    const halls = await this.createHalls();
    const seats = await this.createSeats(halls);
    const movies = await this.createMovies();
    const screenings = await this.createScreenings(halls, movies);
    const bookings = await this.createBookings(screenings);

    await this.createSeatsBooking(bookings, seats);

    return "Executed";
  }

  private async createHalls() {
    const { hall } = mockData;

    await this.prismaService.hall.createMany({
      data: hall,
    });

    const hallsCreated = await this.hallService.findAll();

    return hallsCreated;
  }

  private async createSeats(halls: any) {
    const { seat } = mockData;

    const mock = halls.map((hall, index) => ({
      hallId: hall.id,
      number: seat[index].number,
      row: seat[index].row,
    }));

    await this.prismaService.seat.createMany({
      data: mock,
    });

    const seatsCreated = await this.seatService.findAll();

    return seatsCreated;
  }

  private async createMovies() {
    const { movie } = mockData;

    // Modificación: Añadir películas con releaseDate en el futuro
    const moviesWithReleaseDates = [
      ...movie,
      {
        title: "Avengers: Secret Wars",
        year: 2026,
        genre: "Superhéroes",
        language: "Inglés",
        duration: 180,
        imageUrl: "https://example.com/avengers.jpg",
        trailerUrl: "https://example.com/avengers-trailer.mp4",
        description: "La épica conclusión del Multiverso",
        classification: "PG-13",
        format: ["2D", "3D", "IMAX"],
        releaseDate: new Date("2026-05-01T00:00:00Z"), // Película futura
      },
      {
        title: "Avatar 4",
        year: 2026,
        genre: "Ciencia ficción",
        language: "Inglés",
        duration: 190,
        imageUrl: "https://example.com/avatar4.jpg",
        trailerUrl: "https://example.com/avatar4-trailer.mp4",
        description: "La continuación de la saga de Pandora",
        classification: "PG-13",
        format: ["3D", "IMAX"],
        releaseDate: new Date("2026-12-18T00:00:00Z"), // Película futura
      },
    ];

    await this.prismaService.movie.createMany({
      data: moviesWithReleaseDates,
    });

    const moviesCreated = await this.movieService.findAll();

    return moviesCreated;
  }

  private async createScreenings(halls: any, movies: any) {
    const { screening } = mockData;

    // Modificación: Crear screenings solo para películas ya estrenadas
    const currentMovies = movies.filter(
      (movie) => new Date(movie.releaseDate) <= new Date()
    );

    const mock = screening.map((screening, index) => ({
      hallId: halls[index % halls.length].id, // Usar módulo para evitar desbordamiento
      movieId: currentMovies[index % currentMovies.length].id,
      price: screening.price,
      schedule: screening.schedule,
    }));

    await this.prismaService.screening.createMany({
      data: mock,
    });

    const screeningsCreated = await this.screeningService.findAll();

    return screeningsCreated;
  }

  private async createBookings(screenings: any) {
    const { booking } = mockData;

    const mock = booking.map((booking, index) => ({
      screeningId: screenings[index % screenings.length].id,
      totalPrice: screenings[index % screenings.length].price,
      userId: booking.userId,
    }));

    await this.prismaService.booking.createMany({
      data: mock,
    });

    const bookingsCreated = await this.prismaService.booking.findMany();

    return bookingsCreated;
  }

  private async createSeatsBooking(bookings: any, seats: any) {
    const mock = bookings.map((booking, index) => ({
      bookingId: booking.id,
      seatId: seats[index % seats.length].id,
    }));

    await this.prismaService.seatBooking.createMany({
      data: mock,
    });

    const seatsBookingCreated = await this.bookingService.findAll();

    return seatsBookingCreated;
  }
}
