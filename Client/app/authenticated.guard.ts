import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot  } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'app';
import { AuthTokenService } from 'app-shared';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    loggedIn: {};

    constructor(private router: Router, private store: Store<AppState>, private authTokenService: AuthTokenService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authTokenService.hasValidAccessToken()) {
             return true;
        }
        
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
} 
