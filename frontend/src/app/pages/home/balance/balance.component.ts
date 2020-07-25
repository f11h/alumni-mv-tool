import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionService} from '../../../shared/services/transaction.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../../../shared/classes/user';

@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {
    balance: number;
    sub: Subscription;
    currentUser: User;

    constructor(private transactionService: TransactionService, private authService: AuthService) {
        this.currentUser = this.authService.getCurrentUser();
    }

    ngOnInit() {
        this.sub = this.transactionService.getBalanceFromUser(
            this.authService.getCurrentUser()
        ).subscribe(balance => {
            this.balance = balance;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
