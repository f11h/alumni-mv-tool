import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Property, Required} from "@tsed/common";
import {Member} from "./Member";

@Entity()
export class Transaction {

    constructor (partial: Partial<Transaction>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn("uuid")
    @Property()
    id: string;

    @ManyToOne(type => Member, member => member.transactions)
    member: Member;

    @Column()
    @Property()
    @Required()
    description: string;

    @CreateDateColumn()
    @Property()
    created: Date;

    @Column()
    @Property()
    @Required()
    amount: number;
}
