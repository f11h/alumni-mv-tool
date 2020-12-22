import {EntityRepository, Repository} from "typeorm";
import {DirectDebitMandate} from "../model/DirectDebitMandate";

@EntityRepository(DirectDebitMandate)
export class DirectDebitMandateRepository extends Repository<DirectDebitMandate> {

    public async getDirectDebitMandateByMemberId(id: string): Promise<DirectDebitMandate> {
        return await this.findOne({
            relations: ["member"],
            where: {member: {id: id}}
        })
    }
}
