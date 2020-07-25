import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Statistics} from '../types/statistics';
import {Observable} from 'rxjs';
import {User} from '../classes/user';
import {AuthService} from './auth.service';

@Injectable()
export class StatisticsService {

    constructor(private base: BaseService, private authService: AuthService, private http: HttpClient) {
    }

    getGlobalStatistics(): Observable<Statistics> {
        return this.http.get<Statistics>(
            this.base.buildApiUrl('statistics'),
            this.authService.getHttpOptionsWithAuthentification()
        );
    }

    getStatisticsForUser(user: User): Observable<Statistics> {
        return this.http.get<Statistics>(
            this.base.buildApiUrl('users', user.id.toString(), 'statistics'),
            this.authService.getHttpOptionsWithAuthentification()
        );
    }
}
