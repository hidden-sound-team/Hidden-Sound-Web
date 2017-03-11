import { Component, OnInit }    from '@angular/core';
import { isBrowser }            from 'angular2-universal';

export class newPass {
    password:       string;
    passwordConf:   string;
}

@Component({
    selector: 'app-account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.css']
})
export class AccountComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
