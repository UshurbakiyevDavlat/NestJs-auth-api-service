import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from 'src/app/config/configuration';
import { Env } from 'src/core/utils/env';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { RolesModule } from './app/roles/roles.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './app/auth/filter/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: [
        Env.readString('NODE_ENV', '')
          ? `.env.${Env.readString('NODE_ENV', '')}`
          : null,
        '.env',
        '.sample.env',
      ].filter(Boolean),
      expandVariables: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule, UsersModule, AuthModule, RolesModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<SequelizeModuleOptions>('database'),
    }),
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
