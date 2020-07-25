import {Injectable} from '@angular/core';

const apiUrl = '/api/';

@Injectable()
export class BaseService {

    constructor() {
    }


    buildApiUrl(...parts: string[]): string {
        return apiUrl + parts.join('/');
    }
}
