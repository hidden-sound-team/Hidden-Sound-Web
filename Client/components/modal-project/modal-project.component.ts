import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-modal-project',
    template: require('./modal-project.component.html'),
    styles: [require('./modal-project.component.css')]
})
export class ModalProjectComponent  {

    public visible = false;
    private visibleAnimate = false;

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true);
    }


    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
     }
}

