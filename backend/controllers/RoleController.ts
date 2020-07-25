import {BodyParams, Controller, Delete, Get, PathParams, Post, UseAuth} from '@tsed/common';
import {RoleService} from "../services/RoleService";
import {Role} from "../model/Role";
import {NotFound} from "ts-httpexceptions";
import {AuthMiddleware} from "../security/AuthMiddleware";

@Controller('/roles')
export class RoleController {

    constructor(private roleService: RoleService) {
    }

    @Get('/')
    @UseAuth(AuthMiddleware, {permission: "roles.read"})
    public async getAllRoles(): Promise<Role[]> {
        return await this.roleService.getAllRoles();
    }

    @Post("/")
    public async createRole(@BodyParams() role: Role): Promise<Role> {
        return await this.roleService.createRole(role);
    }

    @Get("/:roleId")
    public async getRoleById(@PathParams("roleId") roleId: string): Promise<Role> {
        const role = await this.roleService.getRoleById(roleId);

        if (role === undefined) {
            throw new NotFound("Role with id " + roleId + " not found");
        }

        return role;
    }

}
