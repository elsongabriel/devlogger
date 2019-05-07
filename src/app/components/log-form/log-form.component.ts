import {Component, OnInit, ViewChild} from '@angular/core';
import {Log} from '../../models/Log';
import {LogService} from '../../services/log.service';

@Component({
    selector: 'app-log-form',
    templateUrl: './log-form.component.html',
    styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

    log: Log = {
        id: null,
        text: null,
        date: null
    };
    isNew: boolean = true;

    @ViewChild('logForm') form: any;

    constructor(private logService: LogService) {
    }

    ngOnInit() {
        this.logService.selectedLog.subscribe(log => {
            if (log.id !== null) {
                this.isNew = false;
                this.log = log;
            }
        });
    }

    onSubmit({value, valid}: { value: Log, valid: boolean }) {
        if (!valid) {
            console.log('form not valid');
        } else {
            if (this.isNew) {
                this.logService.addLog({
                    id: this.uuidv4(),
                    text: value.text,
                    date: new Date()
                });
            } else {
                this.logService.updateLog({
                    id: value.id,
                    text: value.text,
                    date: new Date()
                });
            }
        }
        this.clearForm();
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        //     const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        //     return v.toString(16);
        // });
    }

    checkMinLength(obj, length) {
        return (obj === null || obj.text === null) ? true : (obj.text.isEmpty === '' || obj.text.length < length);
    }

    clearForm() {
        this.isNew = true;
        this.log = {
            id: null,
            text: null,
            date: null
        };
        this.logService.clearState();
    }
}
