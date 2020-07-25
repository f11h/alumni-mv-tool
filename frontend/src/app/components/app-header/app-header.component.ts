import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

    constructor(private authService: AuthService, private router: Router) {
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['pages', 'login']);
    }
}
