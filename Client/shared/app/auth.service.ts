import { Injectable } from '@angular/core';
import { ApiHttpService } from '../http/http-api.service';
import { Observable, Observer } from 'rxjs';
import { StorageService } from '../cache/storage/storage.service';
import { User } from './user.service';
import { AuthTokenService } from './auth-token.service';

class OAuthTokenRequest {
    grant_type: string;
    client_id: string;
    scope: string;
    username: string;
    password: string;
}

class OAuthTokenResponse {
    access_token: string;
    expires_in: number;
    id_token: string;
    token_type: string;
}

class UserInfoResponse {

}

@Injectable()
export class AuthService {

    constructor(private apiService: ApiHttpService, private storageService: StorageService, private authTokenService: AuthTokenService) { }
    
    login(username: string, password: string): Promise<User> {
        let request = new OAuthTokenRequest();
        request.grant_type = 'password';
        request.client_id = 'a5U4DvFf3r2N9Kg';
        request.scope = 'openid profile email';
        request.username = username;
        request.password = password;

        return new Promise<User>((resolve, reject) => {
            this.apiService.postForm('/OAuth/Token', request)
                .subscribe(r => {
                    let result = <OAuthTokenResponse>r.json();
                    this.authTokenService.setAccessToken(result.access_token);
                    this.authTokenService.setExpiresOn(Date.now() + (result.expires_in * 1000));

                    let user = new User();
                    user.username = username;

                    resolve(user);
                    /*
                    this.apiService.get('/OAuth/UserInfo')
                        .map(r => r.json())
                        .subscribe(result => {
                            this.storageService.setItem('user', JSON.stringify(result));
                            resolve(user);
                        },
                        error => {
                            reject(error);
                        });
                        */
                },
                error => {
                    let jsonError = error.json();
                    if(jsonError.error == 'invalid_grant'){
                        reject(jsonError.error_description);
                    } else {
                        reject("An unknown error has occured");
                    }
                });
        });
    }

    logout() {
        this.authTokenService.removeAccessToken();
    }
}
