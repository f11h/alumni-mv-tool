import {Injectable} from '@angular/core';
import {UserRegistration} from '../types/user-registration';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer, Subscriber} from 'rxjs';
import {BaseService} from './base.service';
import {User} from '../classes/user';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {
    private static userCache: User[] = [];

    constructor(private http: HttpClient, private baseService: BaseService, private authService: AuthService) {
    }

    createUserRegistration(userRegistration: UserRegistration): Observable<any> {
        return this.http.post(this.baseService.buildApiUrl('userRegistrations'), userRegistration);
    }

    getUserById(userId: number, useCache: boolean = false): Observable<User> {
        return new Observable<User>((subscriber: Subscriber<User>) => {
            const cachedUser = UserService.userCache.find(user => user.id === userId);

            if (useCache && cachedUser !== undefined) {
                subscriber.next(cachedUser);
                subscriber.complete();
                return;
            }

            this.http.get<User>(
                this.baseService.buildApiUrl('users', userId.toString()),
                this.authService.getHttpOptionsWithAuthentification())
                .subscribe(user => {
                    if (cachedUser !== undefined) {
                        const index = UserService.userCache.indexOf(cachedUser);
                        UserService.userCache[index] = user;
                    } else {
                        UserService.userCache.push(user);
                    }

                    subscriber.next(user);
                    subscriber.complete();
                }, err => {
                    subscriber.error(err);
                    subscriber.complete();
                });
        });
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(
            this.baseService.buildApiUrl('users'),
            this.authService.getHttpOptionsWithAuthentification()
        );
    }

    saveUser(user: User): Observable<User> {
        const data = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            permission: user.permission,
            password: undefined
        };

        if (user.password !== null) {
            data.password = user.password;
        }

        return this.http.put<User>(
            this.baseService.buildApiUrl('users', user.id.toString()),
            data,
            this.authService.getHttpOptionsWithAuthentification(),
        );
    }

    deleteUser(user: User): Observable<null> {
        return this.http.delete<null>(
            this.baseService.buildApiUrl('users', user.id.toString()),
            this.authService.getHttpOptionsWithAuthentification())
    }

    clearUserCache(): void {
        UserService.userCache = [];
    }

}
