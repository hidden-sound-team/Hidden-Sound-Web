import { Component, OnInit } from '@angular/core';
import { QRService } from 'app-shared';


@Component({
    selector: 'app-qr',
    templateUrl: 'qr.component.html',
    styles: [ require( './qr.component.css' )]
})
export class QRComponent implements OnInit {
    authCode: string;
    qrString: string = require('../../images/qrcode.png');
    //'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/2000px-QR_code_for_mobile_English_Wikipedia.svg.png';
    qrVisible: Boolean = false;

    constructor(private qrService: QRService) { }

    ngOnInit() { }

    showQR(){
        // let response = this.qrService.createTransaction();
        // this.authCode = response['authorizationCode'];
        // this.qrString = response['base64QR'];        
        this.qrVisible = true;        
    }
}