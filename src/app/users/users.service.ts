import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './users.model';
import {CreateUserDto} from './dto/create-user-dto';
import {DeleteUserDto} from './dto/delete-user-dto';
import {RegisterResponse} from "../auth/auth.pb";
import {autoGeneratePassword} from "../helpers/autoGenerateStrHelper";
import {hashPassword} from "../helpers/hashHelper";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<RegisterResponse> {
    dto.password = await hashPassword(await autoGeneratePassword());
    if (await this.userRepository.findOne({ where: { email: dto.email } })) {
      return {
        status: HttpStatus.BAD_REQUEST,
        errorMessage: 'Пользователь с таким email уже существует',
        user: null,
      }
    }

    const user =  await this.userRepository.create(dto);

    return {
      status: HttpStatus.CREATED,
      errorMessage: null,
      user: user,
    };
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUser(email: string) {
    return (await this.userRepository.findAll()).find(
      (user) => user.email === email,
    );
  }

  async softDelete(dto: DeleteUserDto) {
    const id = dto.id;
    const user = await this.userRepository.findByPk(id);
    if (!user.deletedAt) {
      user.deletedAt = new Date();
    } else {
      return 'Пользователь уже удален';
    }
    await user.save();
    return 'Пользователь удален';
  }
}
