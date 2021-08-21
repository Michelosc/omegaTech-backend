import { Get, Param, Req } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CriarUsuarioDto } from '../dto/criar-usuario-dto';
import { LoginUsuarioDto } from '../dto/login-usuario-dto';
import { GetUser } from '../get-user.decorator';
import { Usuarios } from '../models/usuarios.model';
import { AuthService } from '../services/auth.service';

@Controller('users')
export class AuthController {
  constructor(private service: AuthService) {}

  @Get('/:access_token/verify')
  getToken(@Param('access_token') token, @Req() req) {
    console.log(req);
    return this.service.getToken(token);
  }

  @Post()
  cadastrar(@Body() dto: CriarUsuarioDto): Promise<void> {
    return this.service.criarUsuario(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginUsuarioDto): Promise<{ accessToken: string }> {
    return this.service.login(dto);
  }
}
