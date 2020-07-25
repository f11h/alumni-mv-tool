import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Property} from "@tsed/common";
import {Member} from "./Member";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn("uuid")
    @Property()
    id: string;

    @ManyToOne(type => Member, member => member.transactions)
    member: Member;

    @Column()
    description: string;

    @CreateDateColumn()
    created: Date;

    @Column()
    amount: number;
}