import { Component, OnInit } from '@angular/core';
import { isBrowser }         from 'angular2-universal';
import { Router }            from '@angular/router';
import { URLSearchParams }   from '@angular/http';

export class UserReg {
    firstname:    string;
    lastname:     string;
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

    // Use "constructor"s only for dependency injection
    constructor() {
    }

    registerUser() {
        
    }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {

    }
}
