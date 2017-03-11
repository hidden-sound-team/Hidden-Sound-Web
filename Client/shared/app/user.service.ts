import { ApiHttpService } from './../http/http-api.service';
import { Injectable } from '@angular/core';

export class User {
    username: string;
}

export class RegisterRequestModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export class UserInfoResponse {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
}

@Injectable()
export class UserService {

    constructor(private apiHttpService: ApiHttpService) { }

    register(request: RegisterRequestModel) {
        return new Promise((resolve, reject) => {
            this.apiHttpService.postForm('/Application/User/Register', request)
                .subscribe(response => {
                    resolve(response.text());
                }, error => {
                    reject(error);
                });
        });
    }

    getUserInfo(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.apiHttpService.get('/Application/User/Info')
                .subscribe(response => {
                    let result = <UserInfoResponse>response.json();

                    let user = new User();
                    user.username = result.userName;

                    resolve(user);
                }, error => {
                    reject(error);
                });
        });
    }
}
