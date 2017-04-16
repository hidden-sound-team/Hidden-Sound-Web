import { Component, OnInit, ViewChild } from '@angular/core';
import { DeveloperService, App, CreateAppResponse } from 'app-shared';
import { ModalComponent } from 'app-components';
import { AppConfig } from 'app';

@Component({
    selector: 'app-account-developer',
    template: require('./account-developer.component.html'),
    styles: [require('./account-developer.component.css')]
})
export class AccountDeveloperComponent implements OnInit {

    apps: App[] = [];
    newApp: CreateAppResponse;    
    selectedApp: App;
    message: string = '';
    applications;
    showNotification = false;
    isAdding = false;
    inputName: string;
    inputRedirect: string;
    
    @ViewChild(ModalComponent)
    public readonly modal: ModalComponent;

    private devDocUrl: string;

    constructor(private devService: DeveloperService, private appConfig: AppConfig) { }

    ngOnInit() { 
        this.getApps();
        this.devDocUrl = this.appConfig.getConfig('apiUrl') + '/swagger';
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
                this.newApp = response;
                this.showNotification = true;
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

    startEdit( app: App ) {
        this.selectedApp = app;
        this.inputName = app.name;
        this.inputRedirect = app.redirectUri;
        this.showNotification = false;
        this.isAdding = false;
        this.modal.show();
    }

    finishEdit( appName: string, uri: string ) {
        this.selectedApp.name = appName;
        this.selectedApp.redirectUri = uri;
        this.devService.editApp( this.selectedApp )
            .then((response) => {
                this.getApps();
                this.showNotification = true;
            })
            .catch((error) => {
                this.message = error;
            });
    }

    startAdd() {
        this.isAdding = true;
        this.showNotification = false;
        this.inputName = '';
        this.inputRedirect = '';
        
        this.modal.show();
    }

}
