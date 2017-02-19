/*
 * _Common_ NgModule to share between our "BASE" App.Browser & App.Server module platforms
 *
 *  If something belongs to BOTH, just put it Here.
 * - If you need something to be very "platform"-specific, put it 
 *   in the specific one (app.browser or app.server)
 */

import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { Ng2BootstrapModule } from 'ng2-bootstrap';

// Main "APP" Root Component
import { BaseSharedModule, AppComponent, appReducer } from 'app';

// Component imports
import { NavMenuComponent } from 'app-components';

import { AppConfig } from './app.config';

// Container (aka: "pages") imports
import {
    HomeComponent,
    LoginComponent,
} from 'app-containers';

// Provider (aka: "shared" | "services") imports
import {
    HttpCacheService, CacheService, // Universal : XHR Cache
    ApiGatewayService, 
    RxContextDirective,
    Meta
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
    { path: 'home', component: HomeComponent, data: { title: 'Home'} },
    { path: 'login', component: LoginComponent, data: { title: 'Login'} },
    { path: '**', redirectTo: 'not-found' }
];


const PIPES = [
    // put pipes here
];

const COMPONENTS = [
    // put shared components here
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,

    // Directives
    RxContextDirective
];

const PROVIDERS = [
    // put shared services here
    CacheService,
    HttpCacheService,
    ApiGatewayService,
    
    Meta // MetaService is a cross platform way to change title, and update anything in the <head>
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
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  providers: [
      ...PROVIDERS,
      AppConfig,
      { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ]
})
export class AppCommonModule {}
