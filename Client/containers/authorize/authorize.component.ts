import { Component, OnInit, OnDestroy } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Router, ActivatedRoute }    from '@angular/router';
import { ApiHttpService, AuthTokenService } from 'app-shared';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppConfig } from 'app';

@Component({
    selector: 'app-authorize',
    template: require( './authorize.component.html' ),
    styles: [require( './authorize.component.css' )]
})

export class AuthorizeComponent implements OnInit, OnDestroy {

    application: string;
    requestId: string;
    scope: string;
    clientId: string;
    redirectUri: string;
    html: string;

    private sub: any;

    constructor (private http: Http, private route: ActivatedRoute, private apiHttpService: ApiHttpService, private authToken: AuthTokenService, private config: AppConfig) {
    
    }

    authorize() {
        if (isBrowser) {
            setTimeout(() => {
                window.location.href = this.config.getConfig('vendorUri') + '/Cart/Authorize?state=' + this.authToken.getAccessToken();
            }, 2000);
        }

        /*
        this.apiHttpService.postForm('/oauth/authorize', 
            {   'request_id': this.requestId, 
                //'client_id': this.clientId, 
                //'response_type': 'code', 
                //'redirect_uri': this.redirectUri, 
                'submit.Accept': '',
                //'response_mode': 'query'
            })
            .subscribe(r => {
                this.html = r.text();
                //if(isBrowser){
                //    window.location.href = this.redirectUri;
                //}
            }, 
            error => {

            });
            */
        console.log('authorize');
    }

    decline() {
        console.log('decline');
    }

    ngOnInit () {
        this.sub = this.route.queryParams.subscribe(params => {
            this.application = params['application'];
            this.requestId = params['request_id'];
            this.scope = params['scope'];
            this.clientId = params['client_id'];
            this.redirectUri = decodeURIComponent(params['redirect_uri']);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
