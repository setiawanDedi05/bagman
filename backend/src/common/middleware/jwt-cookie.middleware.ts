import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtCookieMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const token = req.cookies['token']; // Asumsikan cookie bernama 'jwt'
    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
    next();
  }
}
