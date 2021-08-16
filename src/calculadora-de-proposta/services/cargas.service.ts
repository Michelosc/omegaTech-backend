import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargas } from '../models/cargas.model';

@Injectable()
export class CargasService {
  constructor(
    @InjectRepository(Cargas) private repository: Repository<Cargas>,
  ) {}
}
