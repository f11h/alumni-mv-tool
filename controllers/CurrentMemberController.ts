import {BodyParams, Controller, Delete, Get, Locals, Put, Response, UseAuth} from '@tsed/common';
import {AuthMiddleware} from "../security/AuthMiddleware";
import {Member} from "../model/Member";
import {Role} from "../model/Role";
import {DirectDebitMandate} from "../model/DirectDebitMandate";
import {DirectDebitMandateService} from "../services/DirectDebitMandateService";
import {NotFound} from "ts-httpexceptions";
import {DirectDebitMandateChangeRequest} from "../model/DirectDebitMandateChangeRequest";

@Controller('/currentMember')
export class CurrentMemberController {

    constructor(
        private directDebitMandateService: DirectDebitMandateService
    ) {
    }

    @Get('/')
    @UseAuth(AuthMiddleware)
    public async getCurrentMember(
        @Locals("member") member: Member,
    ): Promise<Member> {

        return member;
    }

    @Get('/roles')
    @UseAuth(AuthMiddleware)
    public async getRolesOfMember(
        @Locals("member") member: Member,
    ): Promise<Role[]> {
        return member.roles
    }

    @Get('/permissions')
    @UseAuth(AuthMiddleware)
    public async getPermissionsOfMember(
        @Locals("effective_permissions") permissions: string[],
    ): Promise<string[]> {
        return permissions;
    }

    @Get('/directdebitmandate')
    @UseAuth(AuthMiddleware)
    public async getDirectDebitMandateOfMember(
        @Locals("member") member: Member,
    ): Promise<DirectDebitMandate> {

        const directDebitMandate = await this.directDebitMandateService.getMemberDirectDebitMandate(member.id, true);

        if (directDebitMandate === undefined) {
            throw new NotFound("Member has no direct debite mandate.");
        } else {
            return directDebitMandate;
        }
    }

    @Put('/directdebitmandate')
    @UseAuth(AuthMiddleware)
    public async updateDirectDebitMandateOfMember(
        @Locals("member") member: Member,
        @BodyParams() data: DirectDebitMandateChangeRequest
    ): Promise<DirectDebitMandate> {
        await this.directDebitMandateService.updateMemberDirectDebitMandate(member, data);
        return this.directDebitMandateService.getMemberDirectDebitMandate(member.id, true);
    }

    @Delete('/directdebitmandate')
    @UseAuth(AuthMiddleware)
    public async deleteDirectDebitMandateOfMember(
        @Locals("member") member: Member,
        @Response() response: Response
    ): Promise<void> {
        await this.directDebitMandateService.deleteMemberDirectDebitMandate(member);
        response.status(204);
    }
}
