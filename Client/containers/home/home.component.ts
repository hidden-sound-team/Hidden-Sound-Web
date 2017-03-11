import { Component, OnInit, Inject } from '@angular/core';
import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'app-home',
    template: require('./home.component.html'),
    styles: [require('./home.component.css')]
})
export class HomeComponent implements OnInit {

    constructor () {
    }

    ngOnInit () {
        
    }
}
