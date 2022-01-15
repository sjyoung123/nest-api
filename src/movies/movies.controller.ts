import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'All Movies';
  }

  @Get('search')
  search(@Query('year') searchAfterYear: string) {
    return `search movies after: ${searchAfterYear} `;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `movieId: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(`:id`)
  remove(@Param('id') movieId: string) {
    return `Delete movieId: ${movieId}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() movieData) {
    return {
      id: movieId,
      ...movieData,
    };
  }
}
