export class Credentials {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    getBasicAuth(): string {
        return 'Basic ' + btoa(this.email + ':' + this.password);
    }
}
