import {Component, Input, OnInit} from '@angular/core';
import {Statistics} from '../../../shared/types/statistics';
import {StatisticsService} from '../../../shared/services/statistics.service';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
    @Input()
    scope: string;

    statistics: Statistics;

    constructor(private authService: AuthService, private statisticsService: StatisticsService) {
    }

    ngOnInit() {
        if (this.scope === 'global') {
            this.statisticsService.getGlobalStatistics()
                .subscribe((statistics) => {
                    this.statistics = statistics;
                }, err => {
                });
        } else if (this.scope === 'user') {
            this.statisticsService.getStatisticsForUser(this.authService.getCurrentUser())
                .subscribe((statistics) => {
                    this.statistics = statistics;
                }, err => {
                });
        }
    }

}
