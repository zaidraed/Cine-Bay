import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { SeatService } from "./seat.service";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("seats")
@Controller("seats")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  @ApiOperation({ summary: "Create a new seat" })
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(createSeatDto);
  }

  @Post("bulk")
  @ApiOperation({ summary: "Create multiple seats at once" })
  createBulk(@Body() createSeatDtos: CreateSeatDto[]) {
    return this.seatService.createBulk(createSeatDtos);
  }
  @Post("generate/:hallId")
  @HttpCode(200)
  @ApiOperation({ summary: "Generate seats for a hall" })
  @ApiResponse({ status: 200, description: "Seats generated successfully" })
  @ApiResponse({ status: 404, description: "Hall not found" })
  async generateHallSeats(@Param("hallId") hallId: string) {
    const result = await this.seatService.generateHallSeats(hallId);
    return {
      message: "Seats generated successfully",
      seatsCreated: result[0].count,
      hallUpdated: result[1].id,
    };
  }

  @Get()
  @ApiOperation({ summary: "Get all seats" })
  findAll() {
    return this.seatService.findAll();
  }

  @Get("hall/:hallId")
  @ApiOperation({ summary: "Get all seats for a specific hall" })
  findByHall(@Param("hallId") hallId: string) {
    return this.seatService.findByHall(hallId);
  }

  @Get("available/:screeningId")
  @ApiOperation({ summary: "Get all available seats for a specific screening" })
  findAvailableSeats(@Param("screeningId") screeningId: string) {
    return this.seatService.findAvailableSeats(screeningId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a seat by id" })
  findOne(@Param("id") id: string) {
    return this.seatService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a seat" })
  update(@Param("id") id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(id, updateSeatDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a seat" })
  remove(@Param("id") id: string) {
    return this.seatService.remove(id);
  }
}
