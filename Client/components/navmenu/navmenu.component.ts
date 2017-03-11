import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, LOGOUT_USER } from 'app';
import { AuthService } from 'app-shared';

@Component({
    selector: 'app-nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent implements OnInit {

    public logoImageUrl = require('../../images/logo-large.png');
    public isCollapsed: boolean = true;


    loggedIn$: {};
    user$: {};


    // Use "constructor"s only for dependency injection
    constructor(private store: Store<AppState>, private authService: AuthService) {}

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit () {
        this.store.select('loggedIn').subscribe(loggedIn => {
            this.loggedIn$ = loggedIn;  
        });

        this.store.select('loggedInUser').subscribe(user => {
            this.user$ = user;
        }); 
    }

    logout() {
        this.authService.logout();
        this.store.dispatch({ type: LOGOUT_USER });
    }
}
