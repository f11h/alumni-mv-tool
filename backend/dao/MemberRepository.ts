import {EntityRepository, Repository} from "typeorm";
import {Member} from "../model/Member";

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

    public getMemberByEmail(email: string, relations: string[] = []): Promise<Member> {
        return this.findOne({
            relations,
            where: {
                email: email
            }
        })
    }

}