import {User} from './user';

export class Card {
    cardId: string;
    owner: User;
    signed?: string;
}
