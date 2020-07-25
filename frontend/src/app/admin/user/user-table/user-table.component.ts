import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/classes/user';
import {TransactionService} from '../../../shared/services/transaction.service';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnDestroy {
    timeout;
    users: User[];
    displayedUsers: User[];
    currentPage = 1;
    itemsPerPage = 10;
    showBalance = false;
    userBalances: number[] = [];

    constructor(private userService: UserService, private transactionService: TransactionService) {
    }

    ngOnInit() {
        this.loadUsers();
    }

    ngOnDestroy() {
        clearTimeout(this.timeout);
    }

    loadUsers() {
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
                this.pageChanged({page: this.currentPage, itemsPerPage: this.itemsPerPage});
                // this.timeout = setTimeout(() => this.loadUsers(), 120000);
            });
    }

    pageChanged(event: { page: number, itemsPerPage: number }) {
        this.currentPage = event.page;

        const startItem = (this.currentPage - 1) * this.itemsPerPage;
        let endItem = startItem + this.itemsPerPage;

        if (endItem > this.users.length) {
            endItem = this.users.length;
        }

        this.displayedUsers = this.users.slice(startItem, endItem);
        this.getBalances();
    }

    getBalances() {
        if (this.showBalance) {
            this.userBalances = [];

            this.displayedUsers.forEach(user => {
                this.transactionService.getBalanceFromUser(user)
                    .subscribe(balance => this.userBalances[user.id] = balance,
                        err => this.userBalances[user.id] = 0);
            });
        }
    }
}
