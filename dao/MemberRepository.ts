import {EntityRepository, Repository} from "typeorm";
import {Member} from "../model/Member";
import {Role} from "../model/Role";
import {DirectDebitMandate} from "../model/DirectDebitMandate";

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

    public async getMemberRoles(id: string): Promise<Role[]> {
        const member = await this.findOne({
            relations: ["roles"],
            where: { id }
        })

        return member.roles;
    }

    public getMemberByEmail(email: string, relations: string[] = []): Promise<Member> {
        return this.findOne({
            relations,
            where: {
                email: email
            }
        })
    }

}
