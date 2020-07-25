import {Injectable} from '@angular/core';
import {MachineService} from './machine.service';
import {Subscriber, from, Observable} from 'rxjs';
import {groupBy, mergeMap, toArray} from 'rxjs/operators';
import {UserService} from './user.service';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {Card} from '../classes/card';
import {User} from '../classes/user';

@Injectable()
export class CardService {

    constructor(private http: HttpClient,
                private authService: AuthService,
                private baseService: BaseService,
                private userService: UserService,
                private machineService: MachineService) {
    }

    getAllCards(): Observable<Card[]> {
        return new Observable<Card[]>((subscriber: Subscriber<Card[]>) => {
            this.http.get<any[]>(
                this.baseService.buildApiUrl('cards'),
                this.authService.getHttpOptionsWithAuthentification()
            ).subscribe(cards => {
                const source = from(cards);
                const groupedByOwner = source.pipe(
                    groupBy(c => c.owner),
                    mergeMap(group => group.pipe(toArray()))
                );

                groupedByOwner.subscribe(group => {
                    this.userService.getUserById(group[0].owner, true)
                        .subscribe(foundUser => {
                            group.forEach(card => card.owner = foundUser);
                        });
                });

                subscriber.next(cards);
                subscriber.complete();
            })
        });
    }

    deleteCardLink(card: Card): Observable<null> {
        return this.http.delete<null>(
            this.baseService.buildApiUrl('users', card.owner.id.toString(), 'cards', card.cardId),
            this.authService.getHttpOptionsWithAuthentification()
        );
    }

    createCardLink(card: Card): Observable<null> {
        const data = {
            cardId: card.cardId
        };

        return this.http.post<null>(
            this.baseService.buildApiUrl('users', card.owner.id.toString(), 'cards'),
            data,
            this.authService.getHttpOptionsWithAuthentification()
        )
    }

    getCardsFromUser(user: User, withSignature: boolean): Observable<Card[]> {
        return new Observable<Card[]>((subscriber: Subscriber<Card[]>) => {
            this.http.get<Card[]>(
                this.baseService.buildApiUrl('users', user.id.toString(), 'cards?withSignature'),
                this.authService.getHttpOptionsWithAuthentification()
            ).subscribe(data => {
                data.forEach(card => {
                    card.owner = user;
                });
                subscriber.next(data);
            });
        });
    }
}
