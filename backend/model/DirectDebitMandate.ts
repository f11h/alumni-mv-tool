import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Property} from "@tsed/common";
import {Address} from "./Address";
import {Member} from "./Member";

@Entity()
export class DirectDebitMandate {

    @PrimaryGeneratedColumn("uuid")
    @Property()
    id: string;

    @Column({unique: true})
    @Property()
    mandateReference: string

    @Column()
    @Property()
    signedAt: Date;

    @Column()
    @Property()
    accountOwnerName: string;

    @Column(type => Address)
    @Property()
    accountOwnerAddress: Address

    @Column()
    @Property()
    bankName: string;

    @Column()
    @Property()
    IBAN: string;

    @OneToOne(member => Member, m => m.directDebitMandate)
    member: Member;

    public constructor(course?: Partial<DirectDebitMandate>) {
        Object.assign(this, course);
    }
}