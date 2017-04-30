import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-project',
    template: require('./project.component.html'),
    styles: [require('./project.component.css')]
})
export class ProjectComponent implements OnInit {

    public archie = require('../../images/team/archie.png');
    public mark = require('../../images/team/mark.png');
    public parth = require('../../images/team/parth.png');
    public brett = require('../../images/team/brett.png');
    public andrew = require('../../images/team/andrew.png');
    public zane = require('../../images/team/zane.png');

    constructor() { }

    ngOnInit() { }
}
