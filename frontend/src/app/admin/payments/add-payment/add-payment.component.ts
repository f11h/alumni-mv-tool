import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/classes/user';
import {TransactionService} from '../../../shared/services/transaction.service';
import {ModalDirective} from "ngx-bootstrap/modal";

@Component({
    selector: 'app-add-payment',
    templateUrl: './add-payment.component.html',
    styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
    form: FormGroup;
    currencyRegex = /^\d+,\d{2}$|^\d+.\d{2}$/;
    selectedUser: User;
    isSavingInProgress = false;

    constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
                amount: ['', Validators.compose([Validators.required, Validators.pattern(this.currencyRegex)])],
                method: ['', Validators.required]
            }
        )
    }

    onSubmit(successModal: ModalDirective, failedModal: ModalDirective) {
        this.isSavingInProgress = true;
        this.form.disable();

        const amount = Math.floor(parseFloat(this.form.get('amount').value.replace(',', '.')) * 100);

        this.transactionService.createDepositForUser(
            this.selectedUser,
            amount,
            this.form.get('method').value
        ).subscribe(() => {
            this.form.reset();
            this.form.enable();
            this.isSavingInProgress = false;
            successModal.show();
        }, () => {
            this.form.reset();
            this.form.enable();
            this.isSavingInProgress = false;
            failedModal.show();
        });
    }

    onUserSelected(user: User) {
        this.selectedUser = user;
    }

}
