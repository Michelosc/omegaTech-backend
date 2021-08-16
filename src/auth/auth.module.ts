import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { Usuarios } from './models/usuarios.model';
import { AuthService } from './services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
