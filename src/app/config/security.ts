import { Env } from 'src/core/utils/env';
import { JWT_TOKEN_TTL } from './constants';
import { jwtConstants } from '../auth/constants';

export function security() {
  return {
    secret: jwtConstants.secret,
    signOptions: { expiresIn: JWT_TOKEN_TTL },
  };
}
