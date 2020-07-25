import {User} from './user';
import {Machine} from './machine';
import {Moment} from 'moment';

export class Purchase {
    id: number;
    user: User;
    machine: Machine;
    price: number;
    product: string;
    timestamp: Moment;
}
