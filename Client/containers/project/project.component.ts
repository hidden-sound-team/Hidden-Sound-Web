import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'app-components';

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

    public buildRelease = require('../../images/info/build-release.png');
    public createTran = require('../../images/info/create-tran.png');
    public sysArch = require('../../images/info/sys-arch.png');

    public showFirstVid: boolean = true;

    @ViewChild(ModalComponent)
    public readonly modal: ModalComponent;

    constructor() { }

    ngOnInit() { }

    showFirstVideo() {
        this.showFirstVid = true;
        this.modal.show();
    }

    showSecondVideo() {
        this.showFirstVid = false;
        this.modal.show();
    }
}
