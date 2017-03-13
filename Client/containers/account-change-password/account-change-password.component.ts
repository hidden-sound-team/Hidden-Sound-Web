import { Component, OnInit } from '@angular/core';

import { UserService, ChangePasswordRequestModel } from 'app-shared';

@Component({
    selector: 'app-account-change-password',
    template: require('./account-change-password.component.html'),
    styles: [require('./account-change-password.component.css')]
})
export class AccountChangePasswordComponent implements OnInit {

    private currentPassword: string;
    private newPassword: string;
    private confirmNewPassword: string;

    private successMessage: string;

    constructor(private userService: UserService) { }

    ngOnInit() { 
        
    }

    saveChanges() {
        this.successMessage = '';

        let request = new ChangePasswordRequestModel();
        request.newPassword = this.newPassword;
        request.currentPassword = this.currentPassword;
        request.confirmNewPassword = this.confirmNewPassword;

        this.userService.changePassword(request).then(r => {
            this.successMessage = 'Your password has been changed.';

            this.currentPassword = '';
            this.newPassword = '';
            this.confirmNewPassword = '';
        });
    }
}
