import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user-dto';
import { DeleteUserDto } from './dto/delete-user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<User | string> {
    if (await this.userRepository.findOne({ where: { email: dto.email } })) {
      return 'Пользователь с таким email уже существует';
    }
    return await this.userRepository.create(dto);
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
