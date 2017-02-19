import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { AppState, LOGIN_USER } from 'app';
import { ApiGatewayService } from 'app-shared';

import { URLSearchParams } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { isBrowser } from 'angular2-universal';

// Demo model
export class UserModel {
    username: string;
    password: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    user: UserModel = new UserModel();

    constructor(private router: Router, private store: Store<AppState>, private oauthService: OAuthService) {}

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit () {

    }

    submitUser() {
        if (isBrowser) {
            this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.user.username, this.user.password)
                .then(() => {
                    console.debug('successfully logged in');
                })
                .catch((err) => {
                    console.error('error logging in', err);
                });
        }
        
        this.store.dispatch({
            type: LOGIN_USER,
            payload: this.user
        });

        this.router.navigate(['/']);
    }

}
