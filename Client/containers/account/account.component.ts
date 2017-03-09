import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-account',
    template: require('./account.component.html'),
    styles: [require('./account.component.css')]
})
export class AccountComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
