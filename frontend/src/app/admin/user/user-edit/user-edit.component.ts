import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/classes/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
    user: User;

    constructor(private route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: { userId: number }) => {
            this.userService.getUserById(params.userId)
                .subscribe(user => this.user = user);
        });
    }

}
