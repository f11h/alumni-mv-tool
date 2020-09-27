import {Property} from "@tsed/common";

export class Balance {

    constructor(balance: number) {
        this.balance = balance;
    }

    @Property()
    balance: number;
}
