import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BaseService} from './base.service';
import {User} from '../classes/user';
import {Purchase} from '../classes/purchase';
import {Observable, Subscriber, from} from 'rxjs';
import {UserService} from './user.service';
import {MachineService} from './machine.service';
import * as moment from 'moment';
import {groupBy, mergeMap, toArray} from 'rxjs/operators';

@Injectable()
export class PurchaseService {

    constructor(private http: HttpClient,
                private authService: AuthService,
                private baseService: BaseService,
                private userService: UserService,
                private machineService: MachineService) {
    }

    getPurchasesFromUser(user: User): Observable<Purchase[]> {
        return new Observable<Purchase[]>((subscriber: Subscriber<Purchase[]>) => {
            this.http.get<any[]>(
                this.baseService.buildApiUrl('users', user.id.toString(), 'purchases'),
                this.authService.getHttpOptionsWithAuthentification()
            ).subscribe(purchases => {
                purchases.forEach(purchase => {
                    purchase.timestamp = moment.utc(purchase.timestamp);
                });

                const source = from(purchases);
                const groupedByUser = source.pipe(
                    groupBy(p => p.user),
                    mergeMap(group => group.pipe(toArray()))
                );

                const groupedByMachine = source.pipe(
                    groupBy(p => p.machine),
                    mergeMap(group => group.pipe(toArray()))
                );

                groupedByUser.subscribe(group => {
                    this.userService.getUserById(group[0].user, true)
                        .subscribe(foundUser => {
                            group.forEach(purchase => purchase.user = foundUser);
                        });
                });

                groupedByMachine.subscribe(group => {
                    this.machineService.getMachineById(group[0].machine, true)
                        .subscribe(foundMachine => {
                            group.forEach(purchase => purchase.machine = foundMachine);
                        });
                });

                purchases.sort((a, b) => {
                    return parseInt(b.timestamp.format('x'), 0) - parseInt(a.timestamp.format('x'), 0);
                });

                subscriber.next(purchases);
                subscriber.complete();
            })
        });
    }

}
