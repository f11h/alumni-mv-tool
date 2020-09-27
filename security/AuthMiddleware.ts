import {$log, EndpointInfo, HeaderParams, IMiddleware, Locals, Middleware, Required} from "@tsed/common";
import {MemberService} from "../services/MemberService";
import {BadRequest, Forbidden, Unauthorized} from "ts-httpexceptions";
import {Role} from "../model/Role";

@Middleware()
export class AuthMiddleware implements IMiddleware {

    constructor(private memberService: MemberService) {
    }

    public async use(@Locals() locals: any, @EndpointInfo() endpointInfo: EndpointInfo, @Required() @HeaderParams("Authorization") authHeader: string): Promise<void> {
        const options = endpointInfo.get(AuthMiddleware) || {};

        const [username, password] = this.getUsernameAndPasswordFromAuthHeader(authHeader);

        $log.debug("Authenticating request at endpoint", endpointInfo.name, "for member ", username);

        const member = await this.memberService.getMemberByEmailAndValidatePassword(username, password, true);

        if (!member) {
            $log.info("Member with Email", username, "and given password could not found in database");
            throw new Unauthorized("Invalid E-Mail or password provided!");
        }

        if (options.permission != undefined) {
            $log.debug("Required permission is", options.permission);

            $log.debug(member.roles);
            const permissions = this.getEffectivePermissionFromMemberRoles(member.roles);

            $log.debug("Member has following permissions:", permissions)

            if (typeof options.permission === "string") {
                if (permissions.indexOf(options.permission) === -1) {
                    throw new Forbidden("Permission " + options.permission + " is required to access this resource");
                }
            } else {
                let anyGranted = false;
                let allGranted = true;

                if (options.permission.any !== undefined) {
                    options.permission.any.forEach(permission => {
                        if (permissions.indexOf(permission) !== -1) {
                            anyGranted = true;
                        }
                    })
                } else {
                    anyGranted = true;
                }

                if (options.permission.all !== undefined) {
                    options.permission.all.forEach(permission => {
                        if (permissions.indexOf(permission) === -1) {
                            allGranted = false;
                        }
                    })
                }

                if (!(allGranted && anyGranted)) {
                    throw new Forbidden("Permissions [" + (options.permission.all || "") + "] and at least one of [" + (options.permission.any || "") + "] is required to access this resource");
                }
            }

            locals.effective_roles = permissions;
        }
        locals.member = member;
    }

    private pushToArrayIfNotContains<T>(array: T[], itemToAdd: T): void {
        if (array.indexOf(itemToAdd) === -1) {
            array.push(itemToAdd);
        }
    }

    private getEffectivePermissionFromMemberRoles(roles: Role[]): string[] {
        const permissions: string[] = [];

        roles.forEach(role => {
            role.permissions.forEach(permission => {
                if (permission.endsWith(".*")) {
                    const basePermission = permission.substr(0, permission.length - 1);

                    this.pushToArrayIfNotContains(permissions, basePermission + "read");
                    this.pushToArrayIfNotContains(permissions, basePermission + "write");
                } else {
                    this.pushToArrayIfNotContains(permissions, permission);
                }
            });
        });

        return permissions;
    }

    private getUsernameAndPasswordFromAuthHeader(authHeader: string): [string, string] {
        if (authHeader.length < 6) {
            throw new BadRequest("Auth header must be valid Basic Auth!");
        }

        const base64String = authHeader.substr(6);
        let decoded;

        try {
            decoded = new Buffer(base64String, "base64").toString("ascii");
        } catch (e) {
            throw new BadRequest("Auth header must be valid Basic Auth!");
        }

        const splitted = decoded.split(":");

        if (splitted.length !== 2) {
            throw new BadRequest("Auth header must be valid Basic Auth!");
        }

        return splitted;
    }

}
