import {Controller, Get, Locals, UseAuth} from '@tsed/common';
import {AuthMiddleware} from "../security/AuthMiddleware";
import {Member} from "../model/Member";

@Controller('/currentMember')
export class CurrentMemberController {

    @Get('/')
    @UseAuth(AuthMiddleware)
    public async getCurrentMember(
        @Locals("member") member: Member,
    ): Promise<Member> {

        return member;
    }
}
