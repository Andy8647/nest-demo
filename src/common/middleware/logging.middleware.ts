import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('from logging middleware');
    next(); // always call next() to pass the request to the next middleware in the chain
  }
}
