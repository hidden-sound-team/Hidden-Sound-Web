import { Component, OnInit } from '@angular/core';
import { ApiHttpService } from 'app-shared';


class AuthorizedApp {
    public id: string;
    public name: string;
}

class AuthorizedAppListResponse {
    public authorizedApplications: AuthorizedApp[];
}

@Component({
    selector: 'app-account-authorized-apps',
    template: require('./account-authorized-apps.component.html'),
    styles: [require('./account-authorized-apps.component.css')]
})
export class AccountAuthorizedAppsComponent implements OnInit {

    authorizedApps: AuthorizedApp[] = [];

    constructor(private apiHttpService: ApiHttpService) { }

    ngOnInit() { 
        this.getAuthorizedApps();
    }

    getAuthorizedApps(){
        this.apiHttpService.get('/Application/AuthorizedApplication/List')
                .subscribe(response => {
                    let result = <AuthorizedAppListResponse>response.json();
                    this.authorizedApps = result.authorizedApplications;
                },
                error => {
                    
                });
    }

    deleteAuthorizedApp(app: AuthorizedApp){
        this.apiHttpService.delete('/Application/AuthorizedApplication/' + app.id)
                .subscribe(response => {
                    this.authorizedApps.splice(this.authorizedApps.indexOf(app, 0), 1);
                }, error => {
                });
    }
}
