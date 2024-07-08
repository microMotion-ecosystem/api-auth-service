import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class CheckHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Request...', req.headers);
    if (req.headers['platform'] !== 'yu2ahel') {
      throw new UnauthorizedException('Invalid platform Key in the Header');
    }
    next();
  }
}
