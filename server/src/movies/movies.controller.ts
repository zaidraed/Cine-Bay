import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  Patch,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Movies")
@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get("now-playing")
  @ApiOperation({ summary: "Get movies currently in theaters" })
  @ApiResponse({
    status: 200,
    description: "Returns movies with screenings today",
    schema: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Movie",
      },
    },
  })
  async findNowPlaying() {
    return this.moviesService.findNowPlayingWithScreenings();
  }

  @Get("upcoming")
  @ApiOperation({ summary: "Get upcoming movies" })
  @ApiResponse({
    status: 200,
    description: "Returns movies with future release dates",
    schema: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Movie",
      },
    },
  })
  async findUpcoming() {
    return this.moviesService.findUpcoming();
  }

  @Post()
  @ApiOperation({ summary: "Create a new movie" })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all movies" })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a movie by ID" })
  findOne(@Param("id") id: string) {
    return this.moviesService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a movie" })
  update(@Param("id") id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Patch(":id")
  async updateMovie(@Param("id") id: string, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a movie" })
  remove(@Param("id") id: string) {
    return this.moviesService.remove(id);
  }
  /*@Get("upcoming")
  @ApiOperation({
    summary: "Get upcoming movies",
    description:
      "Returns a list of movies with release dates in the future, ordered by closest release date first",
  })
  async findUpcoming() {
    return this.moviesService.findUpcoming();
  }
  @Get("now-playing")
  @ApiOperation({
    summary: "Get movies currently playing",
    description: "Returns a list of movies with release dates in the past",
  })
  async findNowPlaying() {
    return this.moviesService.findNowPlaying();
  }*/
}
