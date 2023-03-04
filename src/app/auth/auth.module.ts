import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { security } from '../config/security';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register(security()),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
