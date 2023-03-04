import { Env } from 'src/core/utils/env';

export function docs() {
  return {
    //path: Env.readString('DOCS_PATH'),
    path: '/docs',
    auth: {
      username: Env.readString('DOCS_USERNAME', 'developer'),
      password: Env.readString(
        'DOCS_PASSWORD',
        'crazy monkey eats mushy banana',
      ),
    },
  };
}
