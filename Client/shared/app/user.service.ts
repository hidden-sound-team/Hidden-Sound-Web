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
}
