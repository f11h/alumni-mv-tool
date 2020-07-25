import {Injectable} from '@angular/core';
import {Credentials} from '../classes/credentials';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {User} from '../classes/user';
import {Observable, Subscriber} from 'rxjs';

@Injectable()
export class AuthService {
    private static currentUser: User = null;
    private static credentials: Credentials = null;

    constructor(private http: HttpClient, private base: BaseService) {
    }

    login(credentials: Credentials, saveCredentials: boolean = false): Observable<boolean> {
        return Observable.create((subscriber: Subscriber<boolean>) => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': credentials.getBasicAuth()
                })
            };

            this.http.get<User>(this.base.buildApiUrl('currentUser'), httpOptions)
                .subscribe((response: User) => {
                    AuthService.currentUser = response;

                    if (saveCredentials) {
                        localStorage.setItem('email', btoa(credentials.email));
                        localStorage.setItem('password', btoa(credentials.password));
                    }
                    AuthService.credentials = credentials;

                    subscriber.next(true);
                    subscriber.complete();
                }, (err: HttpErrorResponse) => {
                    AuthService.currentUser = null;
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                    AuthService.credentials = null;

                    subscriber.next(false);
                    subscriber.complete();
                })
        });
    }

    activateUserAccount(token: string): Observable<boolean> {
        return Observable.create((subscriber: Subscriber<boolean>) => {
            this.http.get(this.base.buildApiUrl('userRegistrations', 'redeem', token))
                .subscribe((response: User) => {
                    subscriber.next(true);
                    subscriber.complete();
                }, (err: HttpErrorResponse) => {
                    subscriber.next(false);
                    subscriber.complete();
                })
        });
    }

    getCurrentUser(): User | null {
        return AuthService.currentUser;
    }

    logout(): void {
        AuthService.currentUser = null;
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }

    getAutoLoginCredentials(): Credentials | null {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (email !== null && password !== null && email !== '' && password !== '') {
            return new Credentials(atob(email), atob(password));
        } else {
            return null;
        }
    }

    getHttpOptionsWithAuthentification() {
        return {
            headers: new HttpHeaders({
                'Authorization': AuthService.credentials.getBasicAuth()
            })
        };
    }
}
