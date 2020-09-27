import {BodyParams, Controller, Get, Locals, Post, QueryParams, UseAuth} from '@tsed/common';
import {BadRequest, Forbidden, NotFound, Unauthorized} from "ts-httpexceptions";
import {AuthMiddleware} from "../security/AuthMiddleware";
import {Transaction} from "../model/Transaction";
import {TransactionService} from "../services/TransactionService";
import {MemberService} from "../services/MemberService";
import {Member} from "../model/Member";
import {Balance} from "../model/Balance";

@Controller('/transaction')
export class TransactionController {

    constructor(
        private transactionService: TransactionService,
        private memberService: MemberService,
    ) {
    }

    @Post('/')
    @UseAuth(AuthMiddleware, {permission: "all_transaction.write"})
    public async createTransaction(
        @BodyParams("memberId") memberId: string,
        @BodyParams("transaction") newTransaction: Transaction,
    ): Promise<Transaction> {
        const member = await this.memberService.getMemberById(memberId);

        if (member === undefined) {
            throw new BadRequest("Could not find member with id " + memberId);
        }

        newTransaction.member = member;
        newTransaction.created = new Date();

        return this.transactionService.createTransaction(newTransaction);
    }

    @Get('/')
    @UseAuth(AuthMiddleware, {permission: {any: ["own_transaction.read", "all_transaction.read"]}})
    public async getTransactionForMember(
        @QueryParams("memberId") memberId: string,
        @Locals("member") member: Member,
        @Locals("effective_roles") effectiveRoles: string[]
    ): Promise<Transaction[]> {

        if (memberId === undefined) {
            throw new BadRequest("memberId must be set");
        }

        if (memberId !== member.id && !effectiveRoles.includes("all_transaction.read")) {
            throw new Forbidden("Permission all_transaction.read is required to access this resource");
        }

        const requestedMember = await this.memberService.getMemberById(memberId);

        if (requestedMember === undefined) {
            throw new NotFound("Could not find member with id " + memberId);
        }

        return this.transactionService.getAllTransactionsOfMember(requestedMember);
    }

    @Get('/balance')
    @UseAuth(AuthMiddleware, {permission: {any: ["own_transaction.read", "all_transaction.read"]}})
    public async getBalanceForMember(
        @QueryParams("memberId") memberId: string,
        @Locals("member") member: Member,
        @Locals("effective_roles") effectiveRoles: string[]
    ): Promise<Balance> {

        if (memberId === undefined) {
            throw new BadRequest("memberId must be set");
        }

        if (memberId !== member.id && !effectiveRoles.includes("all_transaction.read")) {
            throw new Forbidden("Permission all_transaction.read is required to access this resource");
        }

        const requestedMember = await this.memberService.getMemberById(memberId);

        if (requestedMember === undefined) {
            throw new NotFound("Could not find member with id " + memberId);
        }

        return new Balance(await this.transactionService.getMemberBalance(requestedMember));
    }
}
