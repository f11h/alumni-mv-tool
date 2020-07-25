import {AbstractControl} from '@angular/forms';

export class PasswordValidator {
    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value; // to get value in input tag
        const confirmPassword = AC.get('passwordRepeat').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('passwordRepeat').setErrors( {MatchPassword: true} )
        } else {
            AC.get('passwordRepeat').setErrors( null );
        }
    }
}
