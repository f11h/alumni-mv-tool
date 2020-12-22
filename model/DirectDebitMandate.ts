import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Property} from "@tsed/common";
import {Address} from "./Address";
import {Member} from "./Member";

@Entity()
export class DirectDebitMandate {

    @PrimaryGeneratedColumn("uuid")
    @Property()
    id: string;

    @Column({unique: true, nullable: true})
    @Property()
    mandateReference: string

    @Column({nullable: true})
    @Property()
    signedAt: Date;

    @Column({nullable: true})
    @Property()
    accountOwnerName: string;

    @Column(type => Address)
    @Property()
    accountOwnerAddress: Address

    @Column()
    @Property()
    IBAN: string;

    @Column({nullable: true})
    @Property()
    BIC: string;

    @OneToOne(member => Member, m => m.directDebitMandate)
    @JoinColumn()
    member: Member;

    public constructor(course?: Partial<DirectDebitMandate>) {
        Object.assign(this, course);
    }
}
