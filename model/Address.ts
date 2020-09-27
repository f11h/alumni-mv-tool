import {Column} from "typeorm";

export class Address {

    @Column()
    street: string;

    @Column()
    houseNumber: string;

    @Column()
    zip: string;

    @Column()
    city: string;

}