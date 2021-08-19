import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarUsuarioDto } from '../dto/criar-usuario-dto';
import { Usuarios } from '../models/usuarios.model';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDto } from '../dto/login-usuario-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios) private repository: Repository<Usuarios>,
    private jwtService: JwtService,
  ) {}

  async criarUsuario(dto: CriarUsuarioDto): Promise<void> {
    const { nome, email, senha } = dto;

    const salt = await bcrypt.genSalt();
    const senhaEncriptada = await bcrypt.hash(senha, salt);

    const usuario = new Usuarios(nome, email, senhaEncriptada);

    const usuarioDuplicado = await this.repository.findOne({
      email: usuario.email,
    });
    if (usuarioDuplicado) {
      throw new ConflictException(
        `Usuário com email ${usuario.email} já existe.`,
      );
    }
    await this.repository.save(usuario);
  }

  async login(dto: LoginUsuarioDto): Promise<{ accessToken: string }> {
    const { email, senha } = dto;
    const usuario = await this.repository.findOne({ email });

    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Por favor, cheque seu email e senha.');
    }
  }
}
