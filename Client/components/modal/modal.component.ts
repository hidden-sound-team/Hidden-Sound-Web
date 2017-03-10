import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-modal',
    template: require('./modal.component.html'),
    styles: [require('./modal.component.css')]
})
export class ModalComponent  {

    public visible = false;
    private visibleAnimate = false;

    private logoUrl = require('../../images/logo-small.png');

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true);
    }


    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
     }
}

