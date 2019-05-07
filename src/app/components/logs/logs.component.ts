import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {Log} from '../../models/Log';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

    logs: Log[];
    selectedLog: Log;
    loaded: boolean = false;

    constructor(private logService: LogService) {
    }

    ngOnInit() {
        this.logService.stateClear.subscribe(clear => {
            if (clear) {
                this.selectedLog = {id: null, text: null, date: null};
            }
        });

        setTimeout(() => {
            this.logService.getLogs().subscribe(logs => {
                this.logs = logs;
                this.loaded = true;
            });
        }, 2000);
    }

    onSelect(log: Log) {
        this.logService.setFormLog(log);
        this.selectedLog = log;
    }

    onDelete(log: Log) {
        if (confirm(`Você tem certeza que quer deletar o log (${log.text})?`)) {
            this.logService.removeLog(log.id);
        }
    }
}
