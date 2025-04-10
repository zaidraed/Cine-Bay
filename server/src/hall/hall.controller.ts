import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { HallService } from "./hall.service";
import { SeatService } from "../seat/seat.service";
import { UpdateHallDto } from "./dto/update-hall.dto";
import { CreateHallDto } from "./dto/create-hall.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Hall")
@Controller("hall")
export class HallController {
  constructor(
    private readonly hallService: HallService,
    private readonly seatService: SeatService
  ) {}

  @Post()
  async create(@Body() createHallDto: CreateHallDto) {
    const hall = await this.hallService.create(createHallDto);

    // Generate seats asynchronously
    this.seatService
      .generateHallSeats(hall.id)
      .catch((err) => console.error("Error generating seats:", err));

    return hall;
  }

  @Get()
  @ApiOperation({ summary: "Get all halls" })
  findAll() {
    return this.hallService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a hall by ID" })
  findOne(@Param("id") id: string) {
    return this.hallService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a hall" })
  update(@Param("id") id: string, @Body() updateHallDto: UpdateHallDto) {
    return this.hallService.update(id, updateHallDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a hall" })
  remove(@Param("id") id: string) {
    return this.hallService.remove(id);
  }
}
