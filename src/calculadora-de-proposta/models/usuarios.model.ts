import { Guid } from 'guid-typescript';

export class Usuarios {
  id: string;
  idPublico: Guid;
  nome: string;
  email: string;
  senha: string;
}
