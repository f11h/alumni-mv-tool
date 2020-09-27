import {Service} from '@tsed/di';
import {Role} from "../model/Role";
import {RoleRepository} from "../dao/RoleRepository";

@Service()
export class RoleService {

    public constructor(
        private roleRepository: RoleRepository,
    ) {
    }

    public async getAllRoles(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    public async getRoleById(roleId: string): Promise<Role> {
        return this.roleRepository.findOne(roleId);
    }


    public createRole(role: Role): Promise<Role> {
        return this.roleRepository.save(role)
    }

}
