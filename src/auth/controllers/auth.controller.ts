import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CriarUsuarioDto } from '../dto/criar-usuario-dto';
import { LoginUsuarioDto } from '../dto/login-usuario-dto';
import { AuthService } from '../services/auth.service';

@Controller('users')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post()
  cadastrar(@Body() dto: CriarUsuarioDto): Promise<void> {
    return this.service.criarUsuario(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginUsuarioDto): Promise<string> {
    return this.service.login(dto);
  }
}
