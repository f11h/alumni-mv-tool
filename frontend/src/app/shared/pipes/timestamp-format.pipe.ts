import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'timestampFormat'
})
export class TimestampFormatPipe implements PipeTransform {

    transform(value: string): any {
        const utcDate = moment.utc(value);

        return moment(utcDate).local().format('DD.MM.YYYY HH:mm:ss');
    }

}
