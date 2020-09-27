import {EntityRepository, Repository} from "typeorm";
import {Role} from "../model/Role";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

}