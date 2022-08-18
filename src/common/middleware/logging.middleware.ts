import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');
    console.log('Hi from middleware');
    res.on('finish', () => console.timeEnd('Request-response time'));
    next(); // always call next() to pass the request to the next middleware in the chain
  }
}
