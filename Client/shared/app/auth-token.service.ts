import { Injectable } from '@angular/core';
import { StorageService } from '../cache/storage/storage.service';
import { AppState, LOGOUT_USER, AppConfig } from 'app';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthTokenService {

    constructor(private storageService: StorageService, private store: Store<AppState>) { }

    setAccessToken(token: string) {
        this.storageService.setItem('access_token', token);
    }

    getAccessToken() {
        return this.storageService.getItem('access_token');
    }

    removeAccessToken() {
        this.storageService.removeItem('access_token');
        this.storageService.removeItem('expires_on');
    }

    hasValidAccessToken(): boolean {
        let valid = this.getAccessToken() && this.getExpiresOn() >= Date.now();
        if(!valid){
            this.removeAccessToken();
            this.store.dispatch({ type: LOGOUT_USER });
        }
        return valid;
    }

    setExpiresOn(expiresOn: number){
        this.storageService.setItem('expires_on', expiresOn);
    }

    getExpiresOn(): number{
        return <number>this.storageService.getItem('expires_on');
    }
}
