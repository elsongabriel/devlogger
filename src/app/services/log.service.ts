import {Injectable} from '@angular/core';
import {Log} from '../models/Log';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    logs: Log[];

    private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
    selectedLog = this.logSource.asObservable();

    private stateSource = new BehaviorSubject<boolean>(true);
    stateClear = this.stateSource.asObservable();

    constructor() {
        // this.logs = [
        //     {id: '1', text: 'Text', date: new Date('05/07/2019 10:41:00')},
        //     {id: '2', text: 'Text exemplo', date: new Date('05/07/2019 10:43:00')},
        //     {id: '3', text: 'Text exemplo 2', date: new Date('05/07/2019 10:44:00')}
        // ];
        // this.logs = [];
    }

    getLogs(): Observable<Log[]> {
        if (localStorage.getItem('logs') === null) {
            this.logs = [];
        } else {
            this.logs = JSON.parse(localStorage.getItem('logs'));
        }
        return of(this.logs.sort((a, b) => {
            return b.date = a.date;
        }));
    }

    setFormLog(log: Log) {
        this.logSource.next(log);
    }

    addLog(log: Log) {
        this.logs.unshift(log);
        this.updateLocalStorage();
    }

    updateLog(log: Log) {
        this.logs.forEach((cur, index) => {
            if (log.id === cur.id) {
                this.logs.splice(index, 1);
            }
        });
        this.logs.unshift(log);
        this.updateLocalStorage();
    }

    removeLog(logId: string) {
        this.logs.forEach((cur, index) => {
            if (cur.id === logId) {
                this.logs.splice(index, 1);
            }
        });
        this.updateLocalStorage();
    }

    clearState() {
        this.stateSource.next(true);
    }

    updateLocalStorage() {
        localStorage.setItem('logs', JSON.stringify(this.logs));
    }
}
