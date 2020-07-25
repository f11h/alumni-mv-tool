import {Service} from "@tsed/di";
import {Member} from "../model/Member";
import {MemberRepository} from "../dao/MemberRepository";
import { $log } from "@tsed/common";
import * as bcrypt from "bcrypt";
import {Role} from "../model/Role";

@Service()
export class MemberService {

    constructor(private memberRepository: MemberRepository) {
    }

    public async getMemberByEmailAndValidatePassword(email: string, password: string, withRoles: boolean = false): Promise<Member> {
        let member = await this.getMemberByEmail(email, withRoles ? ["roles"] : []);

        if (member) {
            $log.debug("Checking password for member with email", email);
            if (!await bcrypt.compare(password, member.password)) {
                $log.debug("Password check for member with email", email, "failed");
                member = undefined;
            }
        }

        return member;
    }

    public getMemberByEmail(email: string, relations: string[] = []): Promise<Member> {
        $log.debug("Getting member with email", email);
        return this.memberRepository.getMemberByEmail(email, relations);
    }

}