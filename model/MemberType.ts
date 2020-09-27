import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Property} from "@tsed/common";
import {Member} from "./Member";

@Entity()
export class MemberType{

    @PrimaryGeneratedColumn("uuid")
    @Property()
    id: string;

    @Column()
    @Property()
    name: string;

    @Column()
    @Property()
    monthlyFee: number;

    @Column()
    @Property()
    annuallyFee: number;

    @OneToMany(type => Member, m => m.memberType)
    members: Member[];
}
