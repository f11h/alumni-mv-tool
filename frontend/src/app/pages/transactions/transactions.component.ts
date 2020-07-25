import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/classes/user';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
    currentUser: User;

    constructor(private authService: AuthService) {
        this.currentUser = this.authService.getCurrentUser();
    }

    ngOnInit() {
    }

}
