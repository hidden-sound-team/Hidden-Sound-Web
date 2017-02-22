import { Component, OnInit, Inject } from '@angular/core';
import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    title: string = 'Register';

    // Use "constructor"s only for dependency injection
    constructor() {
    }

    registerUser() {
        
    }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {

    }
}