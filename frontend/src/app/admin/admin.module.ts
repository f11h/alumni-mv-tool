import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {PaymentsComponent} from './payments/payments.component';
import {UserComponent} from './user/user.component';
import {CardsComponent} from './cards/cards.component';
import {UserTableComponent} from './user/user-table/user-table.component';
import {SharedModule} from '../shared/shared.module';
import {SpinnerModule} from 'spinner-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserEditFormComponent} from './user/user-edit/user-edit-form/user-edit-form.component';
import {PagesModule} from '../pages/pages.module';
import {CardsTableComponent} from './cards/cards-table/cards-table.component';
import {UserSelectorComponent} from './shared/user-selector/user-selector.component';
import {AddCardLinkComponent} from './cards/add-card-link/add-card-link.component';
import {AddPaymentComponent} from './payments/add-payment/add-payment.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AlertModule} from 'ngx-bootstrap/alert';
import {PaginationModule} from 'ngx-bootstrap/pagination';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        SpinnerModule,
        AlertModule.forRoot(),
        PaginationModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        PagesModule,
        ModalModule.forRoot()
    ],
    declarations: [
        CardsComponent,
        PaymentsComponent,
        UserComponent,
        UserTableComponent,
        UserEditComponent,
        UserEditFormComponent,
        CardsTableComponent,
        UserSelectorComponent,
        AddCardLinkComponent,
        AddPaymentComponent
    ]
})
export class AdminModule {
}
