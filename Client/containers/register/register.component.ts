import { Component, OnInit } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { URLSearchParams } from '@angular/http';
import { UserService, RegisterRequestModel } from 'app-shared';
import { AppState, REGISTER_USER } from 'app';

export class UserReg {
    firstName:    string;
    lastName:     string;
    email:        string;
    password:     string;
    passwordConf: string;
}

@Component({
    selector: 'app-register',
    template: require('./register.component.html')
})

export class RegisterComponent implements OnInit {
    title: string = 'Register';
    user: UserReg = new UserReg();
    emailSent: boolean = false;

    constructor(private userService: UserService, private router: Router, private store: Store<AppState>) { }

    registerUser() {
        let request = new RegisterRequestModel();
        request.firstName = this.user.firstName;
        request.lastName = this.user.lastName;
        request.email = this.user.email;
        request.password = this.user.password;
        request.confirmPassword = this.user.passwordConf;

        this.userService.register(request)
            .then(url => {
                this.store.dispatch({
                    type: REGISTER_USER,
                    payload: url
                });
                this.router.navigate(['/login']);
            });
    }

    ngOnInit() {

    }
}
