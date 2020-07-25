import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../../shared/services/statistics.service';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
    selector: 'app-cat',
    templateUrl: './cat.component.html',
    styleUrls: ['./cat.component.scss']
})
export class CatComponent implements OnInit {
    show = false;

    constructor(
        private statisticsService: StatisticsService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.statisticsService.getStatisticsForUser(this.authService.getCurrentUser())
            .subscribe((statistics) => {
                if (statistics.coffeeToday >= 5) {
                    this.show = true;
                }
            });
    }
}
