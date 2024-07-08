import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class CheckHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // console.log('Request...', req.url);
    if (
      req.url.startsWith('/api/') &&
      req.headers['X-Platform'] !== 'yu2ahel' &&
      req.headers['X-Platform'.toLowerCase()] !== 'yu2ahel'
    ) {
      throw new UnauthorizedException('Invalid X platform Key in the Header');
    }
    next();
  }
}
