import { Module } from "@nestjs/common";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { ImagesModule } from "./images/images.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { MoviesModule } from "./movies/movies.module";
import { BookingModule } from "./booking/booking.module";
import { HallModule } from "./hall/hall.module";
import { ScreeningModule } from "./screening/screening.module";
import { PaymentsModule } from "./payments/payments.module";
import { OrdersModule } from "./orders/orders.module";
import { ConfigModule } from "@nestjs/config";
import { NotificationsModule } from "./notifications/notifications.module";
import { SeatModule } from "./seat/seat.module";
import { SeedModule } from "./seed/seed.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CloudinaryModule,
    ImagesModule,
    PrismaModule,
    MoviesModule,
    BookingModule,
    AuthModule,
    HallModule,
    ScreeningModule,
    PaymentsModule,
    OrdersModule,
    NotificationsModule,
    SeatModule,
    ...(process.env.NODE_ENV !== "production" ? [SeedModule] : []),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
