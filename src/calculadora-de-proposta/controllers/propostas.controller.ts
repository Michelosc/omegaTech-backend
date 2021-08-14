import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('propostas')
export class PropostasController {
  @Get()
  GetAll() {
    return 'Hello World';
  }
}
