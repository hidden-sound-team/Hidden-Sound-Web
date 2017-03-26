import { Component, OnInit, ViewChild } from '@angular/core';
import { DeveloperService, App } from 'app-shared';
import { ModalComponent } from 'app-components';

@Component({
    selector: 'app-account-developer',
    template: require('./account-developer.component.html'),
    styles: [require('./account-developer.component.css')]
})
export class AccountDeveloperComponent implements OnInit {

    apps: App[];
    message: string = '';
    applications;

    @ViewChild(ModalComponent)
    public readonly modal: ModalComponent;

    constructor(private devService: DeveloperService) { }

    ngOnInit() { 
        this.getApps();
    }

    getApps() {
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
                this.message = 'App created successfully';
                this.getApps();
            } )
            .catch((error) => {
                this.message = error; 
            });
    }

    deleteApp( clientID: string ) {
        this.devService.deleteApp(clientID)
            .then((response) => {
                this.message = 'SUCCESS';
                this.getApps();
            })
            .catch(error => {
                this.message = error;
            });
    }

}
