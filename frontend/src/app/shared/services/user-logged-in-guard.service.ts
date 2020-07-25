import {Component, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {AuthService} from './auth.service';
import {AppComponent} from '../../app.component';
import {Observable} from 'rxjs';

@Injectable()
export class UserLoggedInGuardService implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (this.authService.getCurrentUser() === null) {
            this.router.navigate(['pages', 'login']);
            return false;
        } else {
            return true;
        }
    }

    constructor(private authService: AuthService, private router: Router) {
    }

}
