import { Controller } from '@nestjs/common';
import { CargasService } from '../services/cargas.service';

@Controller('cargas')
export class CargasController {
  constructor(private service: CargasService) {}
}
