import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from '../models/usuarios.model';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios) private repository: Repository<Usuarios>,
  ) {}
}
