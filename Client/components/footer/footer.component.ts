import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: require('./footer.component.html'),
    styles: [require('./footer.component.css')]
})
export class FooterComponent implements OnInit {
    show: boolean = true;

    constructor(private router: Router) {
        this.router.events.subscribe((val) => {
            if (val.url === '/project') {
                this.show = false;
            }
        });
     }

    ngOnInit() { 

    }
}
