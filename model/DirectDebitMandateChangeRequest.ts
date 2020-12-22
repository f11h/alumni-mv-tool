import {Property} from "@tsed/common";
import {Address} from "./Address";

export class DirectDebitMandateChangeRequest {

    @Property()
    signed: boolean;

    @Property()
    accountOwnerName: string;

    @Property()
    accountOwnerAddress: Address

    @Property()
    IBAN: string;

    @Property()
    BIC: string;

    public constructor(course?: Partial<DirectDebitMandateChangeRequest>) {
        Object.assign(this, course);
    }
}
