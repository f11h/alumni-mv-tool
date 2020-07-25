import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    templateUrl: 'activateAccount.component.html'
})
export class ActivateAccountComponent implements OnInit {
    accountActivated = false;
    invalidToken = false;

    constructor(private route: ActivatedRoute, private authService: AuthService) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            console.log(params.token);
            this.authService.activateUserAccount(params.token)
                .subscribe(result => {
                    this.accountActivated = result;
                    this.invalidToken = !result;
                }, err => {
                    this.invalidToken = true;
                })
        })
    }
}
