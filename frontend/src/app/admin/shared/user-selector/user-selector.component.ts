import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/classes/user';

@Component({
    selector: 'app-user-selector',
    templateUrl: './user-selector.component.html',
    styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {
    users: User[];
    filteredUsers: User[];
    searchTerm = '';
    selectedUserText = '';

    @Input()
    disabled = false;

    @Output()
    onUserSelected = new EventEmitter<User>();

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    loadUsers() {
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
                this.filter();
            });
    }

    filter() {
        if (this.searchTerm === '') {
            this.filteredUsers = this.users;
        } else {
            const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

            this.filteredUsers = this.users.filter(user => {
                let result = false;

                lowerCaseSearchTerm.split(' ').forEach(part => {
                    if (part !== '') {
                        if (user.firstname.toLowerCase().includes(part)) {
                            result = true;
                        }

                        if (user.lastname.toLowerCase().includes(part)) {
                            result = true;
                        }

                        if (user.id.toString() === part) {
                            result = true;
                        }

                        if (user.email.toLowerCase().includes(part)) {
                            result = true;
                        }
                    }
                });

                return result;
            });
        }
        this.filteredUsers = this.filteredUsers.slice(0,5);
    }

    userClicked(user: User) {
        this.selectedUserText = user.firstname + ' ' + user.lastname + ' (' + user.email + ')';
        this.onUserSelected.emit(user);
    }

}
