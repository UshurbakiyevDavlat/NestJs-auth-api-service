import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../app/users/users.model";

interface RolesCreationAttrs {
    title: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RolesCreationAttrs> {
    @ApiProperty({ example: '1', description: 'ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'admin', description: 'Название роли' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @HasMany(() => User)
    users: User[];

    @Column({ type: DataType.DATE, allowNull: true })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    updatedAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt: Date;
}