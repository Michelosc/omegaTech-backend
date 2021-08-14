import { Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CotratarPropostaDto } from '../dto/contratar-proposta-dto';

@Controller('propostas')
export class PropostasController {
  @Get()
  GetAll() {
    return 'Hello World';
  }

  @Post()
  add(dto: CotratarPropostaDto) {}
}
