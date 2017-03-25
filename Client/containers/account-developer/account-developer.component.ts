import { Component, OnInit } from '@angular/core';
import { DeveloperService, App } from 'app-shared';

@Component({
    selector: 'app-account-developer',
    template: require('./account-developer.component.html'),
    styles: [require('./account-developer.component.css')]
})
export class AccountDeveloperComponent implements OnInit {

    apps: App[];
    message: string = '';

    constructor(private devService: DeveloperService) { }

    ngOnInit() { 
        this.devService.getApps()
            .then(apps => {
                this.apps = apps;
                this.message = 'Successfully retrieved app list';                
            })
            .catch(error => {
                this.message = error;
        });
    }

    createApp(appName: string, uri: string) {
        this.message = 'START';
        this.devService.createApp(appName, uri)
            .then((response) => {
                this.message = response.name;
            } )
            .catch((error) => {
                this.message = error; 
            });
    }

    deleteApp( clientID: string ) {
        this.devService.deleteApp(clientID)
            .then((response) => {
                this.message = 'SUCCESS';
            })
            .catch(error => {
                this.message = error;
            });
    }

}
