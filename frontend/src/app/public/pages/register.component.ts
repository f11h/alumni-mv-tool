import {Component} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidator} from '../../shared/classes/password-validator';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
    form: FormGroup;
    isRegistrationInProgress: boolean;
    warningText: string;

    constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
        this.form = this.formBuilder.group({
            firstname: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
            lastname: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
            email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(100)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(100)])],
            passwordRepeat: ['', Validators.required]
        }, {
            validator: PasswordValidator.MatchPassword
        });
    }

    submitForm(successModal: ModalDirective, warningModal: ModalDirective) {
        this.isRegistrationInProgress = true;
        this.form.disable();
        this.userService.createUserRegistration(this.form.value)
            .subscribe(() => {
                successModal.onHide.subscribe(() => {
                    this.router.navigate(['pages', 'login']);
                });

                successModal.show();
            }, (err: HttpErrorResponse) => {
                warningModal.onHide.subscribe(() => {
                    this.isRegistrationInProgress = false;
                    this.form.enable();
                });
                this.warningText = err.message;
                warningModal.show();
            });
    }
}
