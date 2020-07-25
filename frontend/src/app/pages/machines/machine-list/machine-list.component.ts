import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseService} from '../../../shared/services/base.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Machine} from '../../../shared/classes/machine';
import {MachineService} from '../../../shared/services/machine.service';
import {User} from '../../../shared/classes/user';

@Component({
    selector: 'app-machine-list',
    templateUrl: './machine-list.component.html',
    styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit, OnDestroy {
    machines: Machine[];
    currentUser: User;
    timeout;

    constructor(private machineService: MachineService, private authService: AuthService) {
        this.currentUser = this.authService.getCurrentUser();
    }

    ngOnInit() {
        this.loadMachines();
    }

    ngOnDestroy() {
        clearTimeout(this.timeout);
    }

    loadMachines() {
        this.machineService.getAllMachines()
            .subscribe(machines => {
                this.machines = machines;
                this.timeout = setTimeout(() => this.loadMachines(), 60000);
            })
    }

}
