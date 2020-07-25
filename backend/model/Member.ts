import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Email, Property} from "@tsed/common";
import {Address} from "./Address";
import {Transaction} from "./Transaction";
import {MemberType} from "./MemberType";
import {Role} from "./Role";
import {DirectDebitMandate} from "./DirectDebitMandate";

export enum Gender {
    MALE,
    FEMALE,
    OTHER,
    UNKNOWN,
}

@Entity()
export class Member {

    @PrimaryGeneratedColumn("uuid")
    @Property()
    id: string;

    @Column({unique: true})
    @Property()
    @Email()
    email: string;

    @Column()
    password: string;

    @Column()
    @Property()
    firstName: string;

    @Column()
    @Property()
    lastName: string;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.UNKNOWN
    })
    @Property()
    gender: Gender;

    @Column(type => Address)
    @Property()
    address: Address;

    @Column()
    @Property()
    joinedAt: Date

    @OneToMany(type => Transaction, t => t.member)
    transactions: Transaction[];

    @ManyToOne(type => MemberType, mt => mt.members)
    memberType: MemberType;

    @ManyToMany(type => Role, r => r.members)
    @JoinTable()
    roles: Role[];

    @OneToOne(type => DirectDebitMandate, ddm => ddm.member)
    directDebitMandate: DirectDebitMandate;


    public constructor(course?: Partial<Member>) {
        Object.assign(this, course);
    }
}