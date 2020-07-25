import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/classes/user';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
    refresh = 0;

    constructor() {
    }

    ngOnInit() {
    }

    onLinkAdded() {
        this.refresh++;
    }
}
