import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-account-info',
    template: require('./account-info.component.html'),
    styles: [require('./account-info.component.css')]
})
export class AccountInfoComponent implements OnInit {

    private email: string;
    private firstName: string;
    private lastName: string;

    constructor() { }

    ngOnInit() { }
}
