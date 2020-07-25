import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../shared/classes/user';
import {UserService} from '../../../../shared/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-edit-form',
    templateUrl: './user-edit-form.component.html',
    styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent implements OnInit {
    form: FormGroup;
    deletionInProgess = false;
    savingInProgress = false;

    @Input()
    user: User;

    constructor(private fb: FormBuilder, private userService: UserService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            firstname: [this.user.firstname, Validators.required],
            lastname: [this.user.lastname, Validators.required],
            email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.minLength(8)],
            permission: [this.user.permission, Validators.compose([Validators.required, Validators.pattern(/\d*/)])]
        });
    }

    onSubmit(userSavedModal: ModalDirective) {
        this.savingInProgress = true;
        this.form.disable();

        this.user.firstname = this.form.get('firstname').value;
        this.user.lastname = this.form.get('lastname').value;
        this.user.email = this.form.get('email').value;
        this.user.permission = this.form.get('permission').value;

        if (this.form.get('password').value !== '') {
            this.user.password = this.form.get('password').value;
        }

        this.userService.saveUser(this.user)
            .subscribe(user => {
                    userSavedModal.show();
                }, err => {
                    this.form.enable();
                    this.savingInProgress = false;
                },
                () => {
                    this.form.enable();
                    this.savingInProgress = false;
                })
    }

    deleteCurrentUser(userDeletedModal: ModalDirective) {
        this.deletionInProgess = true;
        this.userService.deleteUser(this.user)
            .subscribe(() => {
                userDeletedModal.show();
            })
    }

}
