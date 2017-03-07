import { Component } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Router }    from '@angular/router';

@Component({
    selector: 'app-authorize',
    template: require( './authorize.component.html' ),
    styles: [require( './authorize.component.css' )]
})

export class AuthorizeComponent {

}