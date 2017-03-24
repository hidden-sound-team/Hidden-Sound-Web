import { Injectable } from '@angular/core';
import { ApiHttpService } from './../http/http-api.service';

export class App {
    public name: string;
    public clientId: string;
    public redirectURI: string;
}

class AppListResponse {
    public apps: App[];
}

@Injectable()
export class DeveloperService {

    constructor(private apiHttpService: ApiHttpService) { }

    getApps(): Promise<App[]> {
        return new Promise((resolve, reject) => {
            this.apiHttpService.get('/Application/Application/List')
                .subscribe(response => {
                    let result = <AppListResponse>response.json();
                    resolve(result.apps);
                },
                error => {
                    reject(error);
                });
        });
    }

    createApp(appName: string, uri: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiHttpService.post('/Application/Application/Create', appName, uri)
                .subscribe(response => {
                    resolve(response.json());
                },
                error => {
                    reject(error);
                });
        });
    }

    deleteApp(clientID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiHttpService.delete('/Application/Application/', clientID)
                .subscribe(response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                });
        });
    }


}