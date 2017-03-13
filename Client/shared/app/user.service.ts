import { ApiHttpService } from './../http/http-api.service';
import { Injectable } from '@angular/core';

export class User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

export class RegisterRequestModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export class ChangePasswordRequestModel {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export class UpdateUserInfoRequest {
    firstName: string;
    lastName: string;
}

export class UserInfoResponse {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
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
                    user.username = result.username;
                    user.email = result.email;
                    user.firstName = result.firstName;
                    user.lastName = result.lastName;

                    resolve(user);
                }, error => {
                    reject(error);
                });
        });
    }

    updateUserInfo(request: UpdateUserInfoRequest): Promise<User> {
        return new Promise((resolve, reject) => {
            this.apiHttpService.putForm('/Application/User/Info', request)
                .subscribe(response => {
                    let result = <UserInfoResponse>response.json();

                    let user = new User();
                    user.username = result.username;
                    user.email = result.email;
                    user.firstName = result.firstName;
                    user.lastName = result.lastName;

                    resolve(user);
                }, error => {
                    reject(error);
                });
        });
    }

    changePassword(request: ChangePasswordRequestModel) {
        return new Promise((resolve, reject) => {
            this.apiHttpService.postForm('/Application/User/ChangePassword', request)
                .subscribe(response => {
                    resolve();
                }, error => {
                    reject(error);
                });
        });
    }
}
