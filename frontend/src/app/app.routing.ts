import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

// Import Containers
import {
    FullLayoutComponent,
    SimpleLayoutComponent
} from './containers';
import {HomeComponent} from './pages/home/home.component';
import {PurchasesComponent} from './pages/purchases/purchases.component';
import {MachinesComponent} from './pages/machines/machines.component';
import {TransactionsComponent} from './pages/transactions/transactions.component';
import {ControlComponent} from './pages/control/control.component';
import {UserLoggedInGuardService} from './shared/services/user-logged-in-guard.service';

export const routes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'QCODIS'
        },
        canActivate: [UserLoggedInGuardService],
        children: [
            {
                path: 'home',
                component: HomeComponent,
                pathMatch: 'full',
                data: {
                    title: 'Startseite'
                }
            },
            {
                path: 'purchases',
                component: PurchasesComponent,
                pathMatch: 'full',
                data: {
                    title: 'Meine Kaffees'
                }
            },
            {
                path: 'machines',
                component: MachinesComponent,
                pathMatch: 'full',
                data: {
                    title: 'Kaffeemaschinen'
                }
            },
            {
                path: 'transactions',
                component: TransactionsComponent,
                pathMatch: 'full',
                data: {
                    title: 'Transaktionen'
                }
            },
            {
                path: 'control',
                component: ControlComponent,
                pathMatch: 'full',
                data: {
                    title: 'Maschine steuern'
                }
            },
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
            }
        ]
    },
    {
        path: 'pages',
        component: SimpleLayoutComponent,
        data: {
            title: 'Pages'
        },
        children: [
            {
                path: '',
                loadChildren: () => import('./public/pages/pages.module').then(m => m.PagesModule),
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
