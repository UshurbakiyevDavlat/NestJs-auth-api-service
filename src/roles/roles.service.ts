import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role-dto";
import {DeleteRoleDto} from "./dto/delete-role-dto";
import {UpdateRoleDto} from "./dto/update-role-dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }

    async getRoles() {
        return await this.roleRepository.findAll();
    }

    async createRole(dto: CreateRoleDto) {
        if (await this.roleRepository.findOne({where: {title: dto.title}})) {
            return 'Роль уже существует';
        }
        return await this.roleRepository.create(dto);
    }

    async updateRole(dto: UpdateRoleDto) {
        const role = await this.roleRepository.findByPk(dto.id);
        if (!role) {
            return 'Роль не найдена';
        }
        role.title = dto.title;
        await role.save();
        return 'Роль обновлена';
    }

    async softDelete(dto: DeleteRoleDto) {
        const role = await this.roleRepository.findByPk(dto.id);
        if (!role) {
            return 'Роль не найдена';
        }
        if (!role.deletedAt) {
            role.deletedAt = new Date();
        } else {
            return 'Роль уже удалена';
        }
        await role.save();
        return 'Роль удалена';
    }
}
