import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {User} from '../classes/user';
import {Observable, Subscriber} from 'rxjs';
import {Machine} from '../classes/machine';

@Injectable()
export class MachineService {
    static machineCache: Machine[] = [];

    constructor(private http: HttpClient, private baseService: BaseService, private authService: AuthService) {
    }

    getMachineById(machineId: number, useCache: boolean = false): Observable<Machine> {
        return new Observable<Machine>((subscriber: Subscriber<Machine>) => {
            const cachedMachine = MachineService.machineCache.find(machine => machine.id === machineId);

            if (useCache && cachedMachine !== undefined) {
                subscriber.next(cachedMachine);
                subscriber.complete();
                return;
            }

            this.http.get<Machine>(
                this.baseService.buildApiUrl('machines', machineId.toString()),
                this.authService.getHttpOptionsWithAuthentification())
                .subscribe(machine => {
                    if (cachedMachine !== undefined) {
                        const index = MachineService.machineCache.indexOf(cachedMachine);
                        MachineService.machineCache[index] = machine;
                    } else {
                        MachineService.machineCache.push(machine);
                    }

                    subscriber.next(machine);
                    subscriber.complete();
                }, err => {
                    subscriber.error(err);
                    subscriber.complete();
                });
        });
    }

    getAllMachines(): Observable<Machine[]> {
        return this.http.get<Machine[]>(
            this.baseService.buildApiUrl('machines'),
            this.authService.getHttpOptionsWithAuthentification()
        );
    }

    clearCache(): void {
        MachineService.machineCache = [];
    }

}
