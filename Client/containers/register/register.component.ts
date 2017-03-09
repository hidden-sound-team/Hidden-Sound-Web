import { Component, OnInit }                    from '@angular/core';
import { isBrowser }                            from 'angular2-universal';
import { Router }                               from '@angular/router';
import { Store }                                from '@ngrx/store';
import { URLSearchParams }                      from '@angular/http';
import { AbstractControl, FormGroup, FormBuilder, Validators }   from '@angular/forms';

import { UserService, RegisterRequestModel }    from 'app-shared';
import { AppState, REGISTER_USER }              from 'app';

export class UserReg {
    firstName:    string;
    lastName:     string;
    email:        string;
    password:     string;
    passwordConf: string;
}

@Component({
    selector: 'app-register',
    template: require('./register.component.html'),
    styles: [require('./register.component.css')]
})

export class RegisterComponent implements OnInit {
    title: string = 'Register';
    user: UserReg = new UserReg();
    emailSent: boolean = false;
    regForm: FormGroup;

    formErrors = {
        'fname': '',
        'lname': '',
        'emailaddress': '',
        'pword': ''
    };

    validationMessages = {
        'fname': {
            'required':     'First name is required.',
            'minlength':    'First name must be at least 2 characters long',
            'maxlength':    'First name can be no longer than 24 characters.'
        },
        'lname': {
            'required':     'Last name is required.',
            'minlength':    'Last name must be at least 2 characters long',
            'maxlength':    'Last name can be no longer than 24 characters.'
        },
        'emailaddress': {
            'required':     'Email address is required.',
            'minlength':    'Email address must be at least 7 characters long.',
            'maxlength':    'Email address can be no longer than 24 characters.',
            'pattern':      'Not a valid email.'
        },
        'pword': {
            'required':     'Password is required.',
            'minlength':    'Password must be at least 8 characters long',
            'maxlength':    'Password can be no longer than 24 characters.'
        }
    };


    constructor(private userService: UserService, private router: Router, private store: Store<AppState>,
        private fb: FormBuilder) { }

    registerUser() {
        let request = new RegisterRequestModel();
        request.firstName = this.user.firstName;
        request.lastName = this.user.lastName;
        request.email = this.user.email;
        request.password = this.user.password;
        request.confirmPassword = this.user.passwordConf;

        this.userService.register(request)
            .then(url => {
                this.store.dispatch({
                    type: REGISTER_USER,
                    payload: url
                });
                this.router.navigate(['/login']);
            });
    }

    buildForm(): void {
        this.regForm = this.fb.group({
            fname: [this.user.firstName, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(24)
                ]
            ],
            lname: [this.user.lastName, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(24)
                ]
            ],
            emailaddress:[this.user.email, [
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(24),
                Validators.pattern( '^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$' )
                ]
            ],
            passwords: this.fb.group({
                pword: [this.user.password, [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(24)
                    ]
                ],
                pwordconf: [this.user.passwordConf, [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(24)
                    ]
                ]
            }, {validator: passwordMatcher})            
        });

        this.regForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        
        this.onValueChanged();
    }    

    onValueChanged( data?: any ){
        if (!this.regForm) { return; }

        const form = this.regForm;
        const pwordField = this.regForm.get( 'passwords' ).get( 'pword' );

        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if ( pwordField.errors && pwordField.dirty ){
                const messages = this.validationMessages['pword'];
                
                for (const key in pwordField.errors ){
                    this.formErrors['pword'] += messages[key] + ' ';
                }                
            }            

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                // tslint:disable-next-line:forin
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    
    ngOnInit() {
        this.buildForm();
    }
}

function passwordMatcher( c: AbstractControl ){
    return c.get( 'pword' ).value === c.get( 'pwordconf' ).value
        ? undefined : { 'nomatch': true };
}