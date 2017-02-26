import { Router } from '@angular/router';
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
    template: require('./login.component.html')
})

export class LoginComponent implements OnInit {

    user: UserModel = new UserModel();

    constructor(private router: Router, private store: Store<AppState>, private authService: AuthService) {}

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit () {

    }

    submitUser() {
        this.authService.login(this.user.username, this.user.password)
            .then(result => {
                this.store.dispatch({
                    type: LOGIN_USER,
                    payload: result
                });


                this.router.navigate(['/']);
            }).catch(error => {
            
            });
    }
}
