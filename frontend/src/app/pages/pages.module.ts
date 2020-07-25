import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {PurchasesComponent} from './purchases/purchases.component';
import {MachinesComponent} from './machines/machines.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {ControlComponent} from './control/control.component';
import {StatisticsComponent} from './home/statistics/statistics.component';
import {BalanceComponent} from './home/balance/balance.component';
import {ProductComponent} from './home/product/product.component';
import {SpinnerModule} from 'spinner-angular';
import {SharedModule} from '../shared/shared.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {PurchaseTableComponent} from './purchases/purchase-table/purchase-table.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MachineListComponent} from './machines/machine-list/machine-list.component';
import {TransactionTableComponent} from './transactions/transaction-table/transaction-table.component';
import {CatComponent} from './home/cat/cat.component';
import {DonationComponent} from './home/donation/donation.component';

@NgModule({
    imports: [
        CommonModule,
        SpinnerModule,
        SharedModule,
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        PaginationModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
    ],
    exports: [
        TransactionTableComponent,
    ],
    declarations: [
        HomeComponent,
        PurchasesComponent,
        MachinesComponent,
        TransactionsComponent,
        ControlComponent,
        StatisticsComponent,
        BalanceComponent,
        ProductComponent,
        PurchaseTableComponent,
        MachineListComponent,
        TransactionTableComponent,
        CatComponent,
        DonationComponent,
    ]
})
export class PagesModule {
}
