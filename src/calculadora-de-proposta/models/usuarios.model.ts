import { Guid } from 'guid-typescript';

export class Usuarios {
  id: string;
  id_publico: Guid;
  nome: string;
  email: string;
  senha: string;
}
