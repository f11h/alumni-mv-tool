import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-update-check',
    templateUrl: './app-update-check.component.html',
    styleUrls: ['./app-update-check.component.scss']
})
export class AppUpdateCheckComponent implements AfterViewInit {
    @ViewChild('updateReadyModal', { static: true })
    modal: ModalDirective;
    constructor(private swUpdate: SwUpdate) {
    }

    restartNow() {
        this.swUpdate.activateUpdate()
            .then(() => document.location.reload());
    }

    ngAfterViewInit(): void {
        this.swUpdate.available.subscribe(event => {
            this.modal.show();
        })
    }
}
