import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: Record<string, any>,
    }
  }
}

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService
  ) { }
  async use(req: Request, res: Response, next: () => void) {
    try {
      let token = req.headers.authorization
      console.log(`Logging HTTP request ${req.method} ${req.url} ${res.statusCode}`, token)
      //console.log(req.header)
      if (!token) {
        throw new HttpException('Autorizacion no enviada', HttpStatus.UNAUTHORIZED)
      }
      console.log('token:',token)
      let data = await this.jwtService.verifyAsync(token)
      console.log(data)
      req.user = data 
      next();
    } catch (error) {
      console.log(error)
      throw new HttpException('Autorizacion no enviada', HttpStatus.UNAUTHORIZED)
    }

  }
}
