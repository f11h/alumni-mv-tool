import {Column} from "typeorm";
import {Property} from "@tsed/common";
import {Readonly} from "@tsed/core";

export class Address {

    @Column()
    @Property()
    street: string;

    @Column()
    @Property()
    houseNumber: string;

    @Column()
    @Property()
    zip: string;

    @Column()
    @Property()
    city: string;

}
