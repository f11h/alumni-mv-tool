import {Service} from '@tsed/common';
import {NotFound} from 'ts-httpexceptions';
import {TransactionRepository} from "../dao/TransactionRepository";
import {Member} from "../model/Member";
import {Transaction} from "../model/Transaction";

@Service()
export class TransactionService {

    constructor(
        private transactionRepository: TransactionRepository,
    ) {
    }

    async getAllTransactions(): Promise<Transaction[]> {
        return await this.transactionRepository.find({relations: ['member']})
    }

    async getAllTransactionsOfMember(member: Member): Promise<Transaction[]> {
        return this.transactionRepository.find({where: {member: member}, relations: ['member']});
    }

    async getTransactionById(id: string): Promise<Transaction> {
        return this.getTransaction(new Transaction({id}));
    }

    async getTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
        const foundTransaction = await this.transactionRepository.findOne({
            relations: ['member'],
            where: {
                id: transaction.id
            }
        });

        if (!foundTransaction) {
            throw new NotFound('Transaction not found');
        }

        return foundTransaction;
    }

    async deleteTransactionById(id: string): Promise<void> {
        return this.deleteTransaction(new Transaction({id}));
    }

    async deleteTransaction(transaction: Transaction): Promise<void> {
        const foundTransaction = await this.getTransaction(transaction);
        await this.transactionRepository.delete(foundTransaction.id);
    }

    async createTransaction(transaction: Transaction): Promise<Transaction> {
        transaction.created = new Date();
        return await this.transactionRepository.save(transaction);
    }

    async getMemberBalance(member: Member): Promise<number> {
        return this.transactionRepository.getBalanceOfMember(member);
    }
}
