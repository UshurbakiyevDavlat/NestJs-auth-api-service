import * as path from 'path';
import { ConnectionString } from 'connection-string';
import { Env } from 'src/core/utils/env';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../users/users.model';

export function database({ app: { isDevelopment } }): SequelizeModuleOptions {
  const dbDsn = new ConnectionString(Env.readString('DB_DSN'));

  return <SequelizeModuleOptions>{
    ...{
      dialect: dbDsn.protocol,
      host: dbDsn.hostname,
      port: dbDsn.port,
      username: dbDsn.user,
      password: dbDsn.password,
      database: dbDsn.path[0],
      models: [User],
      autoLoadModels: true,
      synchronize: Env.readBoolish('DB_SYNC'),
      logging: isDevelopment,
      // dbDsn.params is a way to specify custom or override sequelize parameters
      // by adding query parameters (e.g. ?xyz=...) to your DSN, for example "?ssl=true"
    },
    ...(dbDsn.params || {}),
    ...((dbDsn.params || {}).ssl
      ? {
          // Fix managed db connection
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Fix self managed certificate issue
            },
          },
        }
      : {}),
  };
}
