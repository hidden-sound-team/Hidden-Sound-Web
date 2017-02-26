import { Injectable } from '@angular/core';
import { StorageService } from '../cache/storage/storage.service';

@Injectable()
export class AuthTokenService {

    constructor(private storageService: StorageService) { }

    setAccessToken(token: string) {
        this.storageService.setItem('access_token', token);
    }

    getAccessToken() {
        return this.storageService.getItem('access_token');
    }

    removeAccessToken() {
        this.storageService.removeItem('access_token');
    }
}
