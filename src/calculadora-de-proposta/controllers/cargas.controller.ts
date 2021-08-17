import { Body, Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CriarCargasDto } from '../dto/criar-cargas-dto';
import { CargasService } from '../services/cargas.service';

@Controller('cargas')
export class CargasController {
  constructor(private service: CargasService) {}
  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post()
  add(@Body() dto: CriarCargasDto) {
    return this.service.add(dto);
  }
}
