import {Moment} from 'moment';

export class Machine {
    id: number;
    name: string;
    description: string;
    status: {
        poweron: boolean,
        ready: boolean,
        dooropen: boolean,
        waterempty: boolean,
        trashbinfull: boolean,
        timestamp: Moment
    };
}
