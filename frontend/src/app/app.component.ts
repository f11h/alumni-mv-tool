import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {environment} from 'environments/environment';

@Component({
    // tslint:disable-next-line
    selector: 'body',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    env = environment;
    constructor(private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
}
