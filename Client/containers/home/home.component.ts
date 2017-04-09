import { Component, OnInit, Inject } from '@angular/core';
import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'app-home',
    template: require('./home.component.html'),
    styles: [require('./home.component.css')]
})
export class HomeComponent implements OnInit {

    // Images
    public logoImageUrl = require('../../images/logo-large.png');
    public about1 = require('../../images/about1.png');
    public about2 = require('../../images/about2.png');
    public howItWorks = require('../../images/how-it-works.png');


    constructor () {
    }

    ngOnInit () {
        
    }
}
