import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ObjectDisplay} from '../../../objectDisplay/components/ObjectDisplay';
import {DataService} from '../../../services/redux/DataService';

@Component({
    selector: 'state-display',
    templateUrl: './redux/components/StateDisplay/StateDisplay.html',
    styleUrls: ['./redux/components/StateDisplay/StateDisplay.css'],
    directives: [CORE_DIRECTIVES, ObjectDisplay]
})
export class StateDisplay {

    state:any;

    constructor(public dataService:DataService) {
    }

    ngOnInit() {
        this.getState();

        this.dataService.subscribe(() => {
            this.getState();
        });
    }

    getState() {
        this.state = this.dataService.getState();
    }
}
