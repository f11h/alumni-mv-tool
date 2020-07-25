import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Property} from "@tsed/common";
import {Member} from "./Member";

@Entity()
export class MemberType{

    @PrimaryGeneratedColumn("uuid")
    @Property()
    id: string;

    @Column()
    name: string;

    @Column()
    monthlyFee: number;

    @Column()
    annuallyFee: number;

    @OneToMany(type => Member, m => m.memberType)
    members: Member[];

}