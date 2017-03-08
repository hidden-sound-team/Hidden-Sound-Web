import { Component, OnInit, OnDestroy } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Router, ActivatedRoute }    from '@angular/router';
import { ApiHttpService } from 'app-shared';

@Component({
    selector: 'app-authorize',
    template: require( './authorize.component.html' ),
    styles: [require( './authorize.component.css' )]
})

export class AuthorizeComponent implements OnInit, OnDestroy {

    application: string;
    requestId: string;
    scope: string;

    private sub: any;

    constructor (private route: ActivatedRoute, private apiHttpService: ApiHttpService) {
    
    }

    authorize() {
        this.apiHttpService.postForm('/oauth/authorize', { 'request_id': this.requestId, 'submit.Accept': '' })
            .subscribe(r => {

            }, 
            error => {

            });
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
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
