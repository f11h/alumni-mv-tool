import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Member} from "./Member";
import {Property, PropertyDeserialize, Req, Required} from "@tsed/common";

@Entity()
export class Role {

    @PrimaryGeneratedColumn("uuid")
    @PropertyDeserialize(() => undefined)
    id: string;

    @Column()
    @Property()
    @Required()
    name: string;

    @Column("simple-json")
    @Property()
    @Required()
    permissions: string[];

    @ManyToMany(type => Member, m => m.roles)
    members: Member[];

}