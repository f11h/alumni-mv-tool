export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    permission: number;
    password: string = null;

    constructor(id: number, firstname: string, lastname: string, email: string, permission: number) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.permission = permission;
    }
}
