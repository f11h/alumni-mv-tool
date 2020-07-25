import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Transaction} from '../../../shared/classes/transaction';
import {TransactionService} from '../../../shared/services/transaction.service';
import {User} from '../../../shared/classes/user';

@Component({
    selector: 'app-transaction-table',
    templateUrl: './transaction-table.component.html',
    styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit, OnDestroy {
    transactions: Transaction[];
    displayedTransactions: Transaction[];
    timeout;
    currentPage = 1;
    itemsPerPage = 10;

    @Input()
    user: User;

    constructor(private transactionService: TransactionService) {
    }

    ngOnInit() {
        this.loadTransactions();
    }

    ngOnDestroy() {
        clearTimeout(this.timeout);
    }

    loadTransactions() {
        this.transactionService.getTransactionsFromUser(
            this.user
        ).subscribe(transactions => {
            this.transactions = transactions;
            this.pageChanged({page: this.currentPage, itemsPerPage: this.itemsPerPage});

            this.timeout = setTimeout(() => this.loadTransactions(), 120000);
        });
    }

    pageChanged(event: { page: number, itemsPerPage: number }) {
        this.currentPage = event.page;

        const startItem = (this.currentPage - 1) * this.itemsPerPage;
        let endItem = startItem + this.itemsPerPage;

        if (endItem > this.transactions.length) {
            endItem = this.transactions.length;
        }

        this.displayedTransactions = this.transactions.slice(startItem, endItem);
    }
}