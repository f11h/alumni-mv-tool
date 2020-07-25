import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Credentials} from '../../shared/classes/credentials';
import {AuthService} from '../../shared/services/auth.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    isLoginInProgress = false;
    bcm;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.form = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
            autoLogin: [false]
        });
    }

    ngOnInit(): void {
        this.isLoginInProgress = false;
        this.form.enable();

        const storedCredentials = this.authService.getAutoLoginCredentials();

        if (storedCredentials !== null) {
            this.form.get('email').setValue(storedCredentials.email);
            this.form.get('password').setValue(storedCredentials.password);
            this.form.get('autoLogin').setValue(true);
            this.onSubmit();
        }
    }

    onSubmit(badCredentialsModal ?: ModalDirective) {
        this.isLoginInProgress = true;
        this.form.disable();

        const credentials = new Credentials(this.form.value.email, this.form.value.password);
        this.authService.login(credentials, this.form.get('autoLogin').value)
            .subscribe(result => {
                if (result) {
                    this.router.navigate(['home']);
                } else {
                    this.form.get('autoLogin').setValue(false);

                    if (badCredentialsModal) {
                        badCredentialsModal.show();
                    }

                    this.isLoginInProgress = false;
                    this.form.enable();
                }
            }, err => {
                this.isLoginInProgress = false;
                this.form.enable();
            });
    }

}
