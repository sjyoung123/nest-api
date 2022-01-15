import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'All Movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `movieId: ${movieId}`;
  }

  @Post()
  create() {
    return 'Create movie';
  }

  @Delete(`/:id`)
  remove(@Param('id') movieId: string) {
    return `Delete movieId: ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `Patch movieId: ${movieId}`;
  }
}
