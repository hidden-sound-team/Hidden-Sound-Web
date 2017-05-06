/*
 * _Common_ NgModule to share between our "BASE" App.Browser & App.Server module platforms
 *
 *  If something belongs to BOTH, just put it Here.
 * - If you need something to be very "platform"-specific, put it 
 *   in the specific one (app.browser or app.server)
 */
require('../images/favicon.ico');

import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { Ng2BootstrapModule, CollapseDirective } from 'ng2-bootstrap';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { Ng2TableModule } from 'ng2-table/ng2-table';

// Main "APP" Root Component
import { BaseSharedModule, AppComponent, appReducer } from 'app';

// Component imports
import { NavMenuComponent, FooterComponent, ModalComponent, ModalProjectComponent } from 'app-components';

import { AppConfig, AuthenticatedGuard, NonAuthenticatedGuard } from 'app';

// Container (aka: "pages") imports
import {
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AuthorizeComponent,
    AccountComponent,
    AccountInfoComponent,
    AccountDevicesComponent,
    AccountChangePasswordComponent,
    AccountDeveloperComponent,
    QRComponent,
    AccountAuthorizedAppsComponent,
    ProjectComponent
    
} from 'app-containers';

// Provider (aka: "shared" | "services") imports
import {
    HttpCacheService, CacheService, // Universal : XHR Cache
    RxContextDirective,
    Meta,

    AuthTokenService,
    ApiHttpService,
    AuthService,
    UserService,
    QRService,
    DeviceService,
    AppService,
    DeveloperService
} from 'app-shared';

//////////////////////////////////////////////////////////////////

// This imports the variable that, in a hot loading situation, holds
// a reference to the previous application's last state before
// it was destroyed.
import { appState } from 'app';

/* 
 * All of our Applications ROUTES Go here (imported in MODULES) 
 */
const ROUTES: Route[] = [
    // Base route
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Other routes
    { path: 'home', component: HomeComponent, data: { title: 'Two Factor Authentication Manager'} },
    { path: 'login', component: LoginComponent, data: { title: 'Login' }, canActivate: [NonAuthenticatedGuard] },
    { path: 'register', component: RegisterComponent, data: { title: 'Register' }, canActivate: [NonAuthenticatedGuard] },
    { path: 'authorize', component: AuthorizeComponent, data: { title: 'Authorize' }, canActivate: [AuthenticatedGuard] },
    { path: 'account', component: AccountComponent, data: { title: 'Account' }, canActivate: [AuthenticatedGuard], children: [
        { path: 'devices', component: AccountDevicesComponent, data: { title: 'Account - Devices' }, canActivate: [AuthenticatedGuard] },
        { path: 'changepassword', component: AccountChangePasswordComponent, data: { title: 'Account - Change Password' }, canActivate: [AuthenticatedGuard] },
        { path: 'developer', component: AccountDeveloperComponent, data: { title: 'Account - Developer' }, canActivate: [AuthenticatedGuard] },
        { path: 'authorizedapps', component: AccountAuthorizedAppsComponent, data: { title: 'Account - Authorized Apps' }, canActivate: [AuthenticatedGuard]},
        { path: 'info', component: AccountInfoComponent, data: { title: 'Account' }, canActivate: [AuthenticatedGuard] },
        { path: '', pathMatch: 'full', redirectTo: 'info' }
    ]},
    { path: 'authorize', component: AuthorizeComponent, data: { title: 'Authorize' }, canActivate: [AuthenticatedGuard]},
    { path: 'project', component: ProjectComponent, data: { tittle: 'The Project' }},
    { path: 'logout', redirectTo: 'home' },
    { path: '**', redirectTo: 'not-found' }
];



const PIPES = [
    // put pipes here
];

const COMPONENTS = [
    // Directives
    RxContextDirective,

    // put shared components here
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    ModalComponent,
    ModalProjectComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AuthorizeComponent,
    AccountComponent,
    AccountInfoComponent,
    AccountDevicesComponent,
    AccountChangePasswordComponent,
    AccountDeveloperComponent,
    AccountAuthorizedAppsComponent,
    QRComponent,
    ProjectComponent
];

const PROVIDERS = [
    Meta, // MetaService is a cross platform way to change title, and update anything in the <head>

    CacheService,
    HttpCacheService,
    
    AuthTokenService,
    ApiHttpService,
    AuthService,
    UserService,
    QRService,
    
    DeviceService,
    AppService,
    DeveloperService,

    AuthenticatedGuard,
    NonAuthenticatedGuard
];


/* 
 * Common NgModule (remember this gets imported into app.browser.module & app.server.module)
 */
@NgModule({
  imports: [
    // Do NOT include UniversalModule, HttpModule, or JsonpModule here

    // This has ALL the "Common" stuff (CommonModule, FormsModule, ReactiveFormsModule, etc etc)
    // You would import this into your child NgModules so you don't need to duplicate so much code
    BaseSharedModule,

    // Angular
    RouterModule,

    // NgRx
    StoreModule.provideStore(appReducer, appState),
    EffectsModule,

    // Bootstrap
    Ng2BootstrapModule.forRoot(),

    // Routing
    RouterModule.forRoot(ROUTES),

    Ng2PageScrollModule.forRoot(),
    
    Ng2TableModule
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  providers: [
      AppConfig,
      ...PROVIDERS,
      { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ]
})
export class AppCommonModule {}
