import { Component, OnInit } from '@angular/core';
import { DeveloperService, App } from 'app-shared';

@Component({
    selector: 'app-account-developer',
    template: require('./account-developer.component.html'),
    styles: [require('./account-developer.component.css')]
})
export class AccountDeveloperComponent implements OnInit {

    apps: App[];
    errorMsg: string;

    constructor(private devService: DeveloperService) { }

    ngOnInit() { 
        this.devService.getApps()
            .then(apps => {
                this.apps = apps;                
            })
            .catch(error => {
                this.errorMsg = error;
        });
    }
}
