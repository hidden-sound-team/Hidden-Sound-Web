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
                .subscribe( response => {
                    let result = <AppListResponse>response.json();
                    resolve(result.apps);
                },
                error => {
                    reject(error.json());
                });
        });
    }

    createApp() {

    }

    deleteApp() {

    }


}