import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'dushurbakiev@gmail.com', description: 'Почта' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'qwerty1234', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: '1', description: 'Идентификатор роли' })
  @Column
  @ForeignKey(() => Role)
  roleId: number;

  // @BelongsTo(() => Role)
  // role: Role;

  @Column({ type: DataType.DATE, allowNull: true })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
