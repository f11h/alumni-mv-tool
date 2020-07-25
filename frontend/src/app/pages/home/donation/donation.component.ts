import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {DonationService} from '../../../shared/services/donation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {DonationSettings} from '../../../shared/classes/donationSettings';
import {MoneyFormatPipe} from '../../../shared/pipes/money-format.pipe';

@Component({
    selector: 'app-donation',
    templateUrl: './donation.component.html',
    styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
    show = false;
    form: FormGroup;
    isSavingInProgress = false;
    currencyRegex = /^\d+,\d{2}$|^\d+.\d{2}$/;
    currentDonationValue;

    constructor(
        private donationService: DonationService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
    ) {
    }

    async ngOnInit() {
        this.show = true;
        this.form = this.formBuilder.group({
                amount: ['', Validators.compose([Validators.required, Validators.pattern(this.currencyRegex)])],
            }
        );
        await this.updateFormControl();
    }

    private async updateFormControl() {
        const donationSettings = await this.donationService.getDonationSettingByUser(this.authService.getCurrentUser()).toPromise();
        this.form.get('amount').setValue(new MoneyFormatPipe().transform(donationSettings.amount));

        this.currentDonationValue = (await this.donationService.getTotalDonationAmount().toPromise()).amount;
    }

    async onSubmit(successModal: ModalDirective) {
        this.isSavingInProgress = true;
        this.form.disable();

        const amount = Math.floor(parseFloat(this.form.get('amount').value.replace(',', '.')) * 100);
        const donationSettings = new DonationSettings();
        donationSettings.amount = amount;
        donationSettings.user = this.authService.getCurrentUser().id;

        await this.donationService.saveDonationSettings(donationSettings).toPromise();

        this.form.reset();

        await this.updateFormControl()
        this.form.enable();
        this.isSavingInProgress = false;
        successModal.show();
    }
}
