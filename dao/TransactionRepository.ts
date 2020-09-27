import {EntityRepository, Repository} from "typeorm";
import {Member} from "../model/Member";
import {Transaction} from "../model/Transaction";

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {

    async getBalanceOfMember(member: Member): Promise<number> {
        const result = await this
            .createQueryBuilder('transaction')
            .select('SUM(transaction.amount) as balance')
            .where('memberId=:memberid', { memberid: member.id })
            .getRawOne();

        return parseInt(result.balance, 10) || 0;
    }
}
