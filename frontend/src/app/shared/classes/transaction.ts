import {User} from './user';
import {Moment} from 'moment';
import {UserService} from '../services/user.service';

export class Transaction {
    id: number;
    user: User;
    timestamp: Moment;
    amount: number;
    description: string;

    constructor(id: number, userId: number, timestamp: Moment, amount: number, description: string, private userService: UserService) {
        this.id = id;
        this.timestamp = timestamp;
        this.amount = amount;
        this.description = description;

        this.userService.getUserById(userId, true)
            .subscribe(user => {
                this.user = user;
            });
    }
}
