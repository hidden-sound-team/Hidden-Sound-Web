import { Component, OnInit } from '@angular/core';

import { UserService, UpdateUserInfoRequest } from 'app-shared';

@Component({
    selector: 'app-account-info',
    template: require('./account-info.component.html'),
    styles: [require('./account-info.component.css')]
})
export class AccountInfoComponent implements OnInit {

    private email: string;
    private firstName: string;
    private lastName: string;
    private successMessage: string;
    private language = 'EN';
    private timezone = '-05:00';

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getUserInfo().then(user => {
            this.email = user.email;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.language = user.language;
            this.timezone = user.timezone;
        });
     }

    private saveChanges() {
        this.successMessage = '';

        let request = new UpdateUserInfoRequest();
        request.firstName = this.firstName;
        request.lastName = this.lastName;
        request.timezone = this.timezone;
        request.language = this.language;

        this.userService.updateUserInfo(request).then(user => {
            this.email = user.email;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.timezone = user.timezone;
            this.language = user.language;

            this.successMessage = 'Your info had been updated.';
        });
     }
}
