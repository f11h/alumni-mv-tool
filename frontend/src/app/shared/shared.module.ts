import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseService} from './services/base.service';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {UserLoggedInGuardService} from './services/user-logged-in-guard.service';
import {StatisticsService} from './services/statistics.service';
import {TransactionService} from './services/transaction.service';
import {MoneyFormatPipe} from './pipes/money-format.pipe';
import {ProductService} from './services/product.service';
import {PurchaseService} from './services/purchase.service';
import {TimestampFormatPipe} from './pipes/timestamp-format.pipe';
import {MachineService} from './services/machine.service';
import {CardService} from './services/card.service';
import {DonationService} from './services/donation.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        BaseService,
        UserService,
        AuthService,
        UserLoggedInGuardService,
        StatisticsService,
        TransactionService,
        ProductService,
        PurchaseService,
        MachineService,
        CardService,
        DonationService,
    ],
    declarations: [
        MoneyFormatPipe,
        TimestampFormatPipe
    ],
    exports: [
        MoneyFormatPipe,
        TimestampFormatPipe
    ]
})
export class SharedModule {
}
