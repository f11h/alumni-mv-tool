import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {User} from '../classes/user';
import {AuthService} from './auth.service';
import {DonationSettings} from '../classes/donationSettings';

@Injectable()
export class DonationService {
    constructor(private http: HttpClient, private baseService: BaseService, private authService: AuthService) {
    }

    getDonationSettingByUser(user: User): Observable<DonationSettings> {
        return this.http.get<DonationSettings>(
            this.baseService.buildApiUrl('donationSettings', user.id.toString()),
            this.authService.getHttpOptionsWithAuthentification(),
        )
    }

    saveDonationSettings(donationSettings: DonationSettings): Observable<DonationSettings> {
        return this.http.put<DonationSettings>(
            this.baseService.buildApiUrl('donationSettings', donationSettings.user.toString()),
            {amount: donationSettings.amount},
            this.authService.getHttpOptionsWithAuthentification(),
        );
    }

    getTotalDonationAmount(): Observable<{ amount: number }> {
        return this.http.get<{ amount: number }>(
            this.baseService.buildApiUrl('donations'),
            this.authService.getHttpOptionsWithAuthentification()
        )
    }
}
