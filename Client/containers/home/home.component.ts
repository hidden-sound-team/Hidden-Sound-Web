import { Component, OnInit, Inject } from '@angular/core';
import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'app-home',
    template: require('./home.component.html'),
    styles: [require('./home.component.css')]
})
export class HomeComponent implements OnInit {

    title: string = 'Home';

    // Use "constructor"s only for dependency injection
    constructor () {
    }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit () {
        console.log('Are we inside the Browser ? ' + isBrowser);
    }
}
