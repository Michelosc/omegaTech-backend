import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { Usuarios } from './models/usuarios.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuarios) private repository: Repository<Usuarios>,
  ) {
    super({
      secretOrKey: 'superSegredo',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Usuarios> {
    const { email } = payload;
    const usuario: Usuarios = await this.repository.findOne({ email });

    if (!usuario) {
      throw new UnauthorizedException();
    }

    return usuario;
  }
}
