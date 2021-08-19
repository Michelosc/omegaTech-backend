import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuarios } from './models/usuarios.model';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Usuarios => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
