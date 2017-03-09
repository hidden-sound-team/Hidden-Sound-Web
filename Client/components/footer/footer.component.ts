import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: require('./footer.component.html'),
    styles: [require('./footer.component.css')]
})
export class FooterComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
