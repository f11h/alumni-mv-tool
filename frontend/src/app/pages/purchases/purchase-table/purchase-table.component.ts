import {Component, OnDestroy, OnInit} from '@angular/core';
import {Purchase} from '../../../shared/classes/purchase';
import {PurchaseService} from '../../../shared/services/purchase.service';
import {AuthService} from '../../../shared/services/auth.service';
import {MachineService} from '../../../shared/services/machine.service';

@Component({
    selector: 'app-purchase-table',
    templateUrl: './purchase-table.component.html',
    styleUrls: ['./purchase-table.component.scss']
})
export class PurchaseTableComponent implements OnInit, OnDestroy {
    purchases: Purchase[];
    displayedPurchases: Purchase[];
    timeout;
    currentPage = 1;
    itemsPerPage = 10;
    totalItems = 0;

    constructor(private purchaseService: PurchaseService, private authService: AuthService, private machineService: MachineService) {
    }

    ngOnInit() {
        this.loadPurchases();
    }

    ngOnDestroy() {
        clearTimeout(this.timeout);
    }

    loadPurchases() {
        this.purchaseService.getPurchasesFromUser(
            this.authService.getCurrentUser()
        ).subscribe(purchases => {
            this.purchases = purchases;
            this.totalItems = this.purchases.length;
            this.pageChanged({page: this.currentPage, itemsPerPage: this.itemsPerPage});

            this.timeout = setTimeout(() => this.loadPurchases(), 120000);
        });
    }

    pageChanged(event: { page: number, itemsPerPage: number }) {
        this.currentPage = event.page;

        const startItem = (this.currentPage - 1) * this.itemsPerPage;
        let endItem = startItem + this.itemsPerPage;

        if (endItem > this.purchases.length) {
            endItem = this.purchases.length;
        }

        this.displayedPurchases = this.purchases.slice(startItem, endItem);
    }
}
