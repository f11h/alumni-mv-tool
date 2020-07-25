import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {ActivateAccountComponent} from './activateAccount.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Example Pages'
        },
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Login'
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    title: 'Registrierung'
                }
            },
            {
                path: 'activateAccount/:token',
                component: ActivateAccountComponent,
                data: {
                    title: 'Account aktivieren'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
