import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {FullLayoutComponent, SimpleLayoutComponent} from './containers';

const APP_CONTAINERS = [
    FullLayoutComponent,
    SimpleLayoutComponent
];

// Import components
import {
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarFormComponent,
    AppSidebarHeaderComponent,
    AppSidebarMinimizerComponent,
    APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarFormComponent,
    AppSidebarHeaderComponent,
    AppSidebarMinimizerComponent,
    APP_SIDEBAR_NAV
];

// Import directives
import {NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES} from './directives';

const APP_DIRECTIVES = [
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES
];

import {AppRoutingModule} from './app.routing';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {environment} from '../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppUpdateCheckComponent} from './components/app-update-check/app-update-check.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ChartsModule} from "ng2-charts";
import {SpinnerModule} from "spinner-angular";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        HttpClientModule,
        SharedModule,
        PagesModule,
        SpinnerModule.forRoot({}),
        ModalModule.forRoot(),
        SharedModule,
        environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
    ],
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES,
        AppUpdateCheckComponent,
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
