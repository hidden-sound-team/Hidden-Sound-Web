import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { AppState, LOGIN_USER } from 'app';

import { URLSearchParams } from '@angular/http';
import { isBrowser } from 'angular2-universal';

import { AuthService } from 'app-shared';

// Demo model
export class UserModel {
    username: string;
    password: string;
}

@Component({
    selector: 'app-login',
    template: require('./login.component.html'),
    styles: [require('./login.component.css')]
})

export class LoginComponent implements OnInit {

    public logoImageUrl = require('../../images/logo-large.png');

    user: UserModel = new UserModel();
    errorMessage: string;
    verifyEmail: string;
    verifyEmailUrl: {};
    returnUrl: string;

    constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppState>, private authService: AuthService) {}

    ngOnInit () {
        if (isBrowser){
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ? decodeURIComponent(this.route.snapshot.queryParams['returnUrl']) : '/';
        }
        
        this.store.select('verifyEmail').subscribe(verifyEmail => {
            this.verifyEmail = '';
            if(verifyEmail){
                this.verifyEmail = "Verification email sent. Please confirm your email before logging in.";
                this.verifyEmailUrl = verifyEmail;
            }
        });
    }

    submitUser() {
        this.authService.login(this.user.username, this.user.password)
            .then(result => {
                this.errorMessage = '';
                this.verifyEmail = '';

                this.store.dispatch({ type: LOGIN_USER, payload: result });

                this.router.navigate([ this.returnUrl ]);
            }).catch(error => {
                this.errorMessage = '';
                this.verifyEmail = '';
                if((<string>error).includes('confirmed email')){
                    this.verifyEmail = error;
                } else {
                    this.errorMessage = error;
                }
            });
    }
}

