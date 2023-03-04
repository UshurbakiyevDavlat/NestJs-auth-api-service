import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user-dto';
import { comparePasswords } from '../helpers/hashHelper';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { LoginResponse } from './auth.pb';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    if (user && (await comparePasswords(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto): Promise<LoginResponse> {
    const roleId = (await this.usersService.getUser(user.email)).roleId;
    const payload = { email: user.email, roleId: roleId };

    return {
      token: this.jwtService.sign(payload),
      status: HttpStatus.OK,
      error: null,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const email = dto.email;
    const password = dto.password;
    return await this.userRepository.update({ password }, { where: { email } });
  }
}
