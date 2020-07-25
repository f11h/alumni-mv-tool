import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {PaymentsComponent} from './payments/payments.component';
import {CardsComponent} from './cards/cards.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Administration'
        },
        children: [
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        component: UserComponent,
                        data: {
                            title: 'Benutzer'
                        }
                    },
                    {
                        path: ':userId',
                        component: UserEditComponent,
                        data: {
                            title: 'Benutzer Bearbeiten'
                        }
                    }
                ]
            },
            {
                path: 'cards',
                component: CardsComponent,
                data: {
                    title: 'Karten'
                }
            },
            {
                path: 'payments',
                component: PaymentsComponent,
                data: {
                    title: 'Zahlungen erfassen'
                }
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
