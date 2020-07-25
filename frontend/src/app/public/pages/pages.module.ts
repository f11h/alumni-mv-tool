import {NgModule} from '@angular/core';

import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {ActivateAccountComponent} from './activateAccount.component';

import {PagesRoutingModule} from './pages-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {SpinnerModule} from 'spinner-angular';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        PagesRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        CommonModule,
        SpinnerModule,
        ModalModule.forRoot()
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ActivateAccountComponent
    ]
})
export class PagesModule {
}
