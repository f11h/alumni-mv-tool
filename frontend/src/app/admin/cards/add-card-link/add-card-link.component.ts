import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/classes/user';
import {CardService} from '../../../shared/services/card.service';
import {ModalDirective} from "ngx-bootstrap/modal";

@Component({
    selector: 'app-add-card-link',
    templateUrl: './add-card-link.component.html',
    styleUrls: ['./add-card-link.component.scss']
})
export class AddCardLinkComponent implements OnInit {
    form: FormGroup;
    selectedUser: User;
    isAddingInProgress = false;
    httperrortext = '';

    @Output()
    onLinkAdded = new EventEmitter();

    constructor(private fb: FormBuilder, private cardService: CardService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
                cardId: ['', Validators.required]
            }
        )
    }

    onSubmit(successModal: ModalDirective, failedModal: ModalDirective) {
        this.isAddingInProgress = true;
        this.form.disable();

        this.cardService.createCardLink({
            cardId: this.form.get('cardId').value,
            owner: this.selectedUser
        }).subscribe(() => {
            this.form.reset();
            this.form.enable();
            this.isAddingInProgress = false;
            this.onLinkAdded.emit();
            successModal.show();
        }, (err) => {
            this.form.reset();
            this.form.enable();
            this.httperrortext = err.error.message || err.statusText;
            this.isAddingInProgress = false;
            this.onLinkAdded.emit();
            failedModal.show();
        });
    }

    onUserSelected(user: User) {
        this.selectedUser = user;
    }

}
