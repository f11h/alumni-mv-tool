import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../classes/user';
import {Observable, Observer, Subscriber, from} from 'rxjs';
import {Transaction} from '../classes/transaction';
import {Purchase} from '../classes/purchase';
import * as moment from 'moment';
import {groupBy, mergeMap, toArray} from 'rxjs/operators';

@Injectable()
export class TransactionService {

    constructor(private http: HttpClient, private baseService: BaseService, private authService: AuthService) {
    }

    getBalanceFromUser(user: User): Observable<number> {
        return new Observable<number>((subscriber: Subscriber<number>) => {
            this.http.get(
                this.baseService.buildApiUrl('users', user.id.toString(), 'balance'),
                this.authService.getHttpOptionsWithAuthentification())
                .subscribe((response: { balance: number }) => {
                    subscriber.next(response.balance);
                    subscriber.complete();
                });
        });
    }

    getTransactionsFromUser(user: User): Observable<Transaction[]> {
        return new Observable<Transaction[]>((subscriber: Subscriber<Transaction[]>) => {
            this.http.get<any[]>(
                this.baseService.buildApiUrl('users', user.id.toString(), 'transactions'),
                this.authService.getHttpOptionsWithAuthentification()
            ).subscribe(transactions => {
                transactions.forEach(transaction => {
                    transaction.timestamp = moment.utc(transaction.timestamp);
                    transaction.user = user;
                });

                transactions.sort((a, b) => {
                    return parseInt(b.timestamp.format('x'), 0) - parseInt(a.timestamp.format('x'), 0);
                });

                subscriber.next(transactions);
                subscriber.complete();
            })
        });
    }

    createDepositForUser(user: User, amount: number, method: string): Observable<null> {
        const data = {
            amount: amount,
            paymentMethod: method
        };

        return this.http.post<null>(
            this.baseService.buildApiUrl('users', user.id.toString(), 'payment'),
            data,
            this.authService.getHttpOptionsWithAuthentification()
        );
    }
}
