import { Injectable } from '@angular/core';
import { ApiHttpService } from './../http/http-api.service';

export class App {
    public name: string;
    public clientId: string;
    public redirectUri: string;
    public description: string;
    public websiteUri: string;
}

class AppListResponse {
    public applications: App[];
}

class CreateAppRequest {
    public name: string;
    public redirectUri: string;
    public description: string;
    public websiteUri: string;
}

class EditAppRequest {
    public name: string;
    public redirectUri: string;
    public description: string;
    public websiteUri: string;
}

export class CreateAppResponse {
    public name: string;
    public clientId: string;
    public clientSecret: string;
    public redirectUri: string;
    public description: string;
    public websiteUri: string;
}

@Injectable()
export class DeveloperService {

    constructor(private apiHttpService: ApiHttpService) { }

    getApps(): Promise<App[]> {
        return new Promise((resolve, reject) => {
            this.apiHttpService.get('/Application/Application/List')
                .subscribe(response => {
                    let result = <AppListResponse>response.json();
                    resolve(result.applications);
                },
                error => {
                    reject(error);
                });
        });
    }

    createApp(appName: string, uri: string, description: string, website: string): Promise<CreateAppResponse> {
        let request = new CreateAppRequest();
        request.name = appName;
        request.redirectUri = uri;
        request.description = description;
        request.websiteUri = website;

        return new Promise((resolve, reject) => {
            this.apiHttpService.postForm('/Application/Application/Create', request)
                .subscribe(response => {
                    let result = <CreateAppResponse>response.json();
                    resolve(result);
                },
                error => {
                    reject(error);
                });
        });
    }

    deleteApp(clientID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiHttpService.delete('/Application/Application/' + clientID)
                .subscribe(response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                });
        });
    }

    editApp(app: App): Promise<any> {
        let request = new EditAppRequest();
        request.name = app.name;
        request.redirectUri = app.redirectUri;
        request.description = app.description;
        request.websiteUri = app.websiteUri;

        return new Promise((resolve, reject) => {
            this.apiHttpService.putForm('/Application/Application/' + app.clientId, request)
                .subscribe(response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                });
        });
    }


}