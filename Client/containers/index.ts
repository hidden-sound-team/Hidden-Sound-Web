
/* 
    This is our "Barrels" index (in this folder)
    Here we can just export all individual things

    We're also using TypeScript2's new "paths" to create non-directory import locations
    So instead of having to do something crazy like: "from '../../containers/'"

    We can just do:
        import { HomeComponent } from 'app-containers';

    Makes life easier!
*/

export * from './home/home.component';
export * from './login/login.component';
export * from './register/register.component';
export * from './authorize/authorize.component';
export * from './qr/qr.component';

export * from './account/account.component';
export * from './account-info/account-info.component';
export * from './account-change-password/account-change-password.component';
export * from './account-developer/account-developer.component';
export * from './account-devices/account-devices.component';
export * from './account-authorized-apps/account-authorized-apps.component';

export * from './project/project.component';
