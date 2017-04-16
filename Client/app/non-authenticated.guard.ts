import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot  } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'app';
import { AuthTokenService } from 'app-shared';

@Injectable()
export class NonAuthenticatedGuard implements CanActivate {

    constructor(private router: Router, private store: Store<AppState>, private authTokenService: AuthTokenService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authTokenService.hasValidAccessToken()) {
             return true;
        }
        
        this.router.navigate(['/account/info']);
        return false;
    }
} 
