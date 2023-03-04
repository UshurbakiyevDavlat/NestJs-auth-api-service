import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { hashPassword } from '../helpers/hashHelper';

@Injectable()
export class HashPasswordInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const password = request.password;

    if (password) {
      request.password = await hashPassword(password);
    }

    return next.handle().pipe(map((data) => data));
  }
}
