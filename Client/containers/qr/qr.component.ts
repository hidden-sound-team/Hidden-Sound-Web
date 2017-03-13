import { Component, OnInit } from '@angular/core';
import { QRService } from 'app-shared';


@Component({
    selector: 'app-qr',
    templateUrl: 'qr.component.html',
    styles: [ require( './qr.component.css' )]
})
export class QRComponent implements OnInit {
    authCode: string;
    qrString: string;
    loading: boolean;
    approveMessage: string;
    declineMessage: string;
    //qrString: string = require('../../images/qrcode.png');
    //'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/2000px-QR_code_for_mobile_English_Wikipedia.svg.png';
    //qrVisible: Boolean = false;

    constructor(private qrService: QRService) { }

    ngOnInit() { 
        
    }

    createAuthorization() {
        this.loading = true;
        this.authCode = '';
        this.qrString = '';
        this.approveMessage = '';
        this.declineMessage = '';

        this.qrService.createTransaction().then(response => {
            this.loading = false;
            this.authCode = response.authorizationCode;
            this.qrString = response.base64QR;
            
        });  
    }

    approve() {
        this.qrService.approve(this.authCode).then(r => {
            this.approveMessage = 'The authorization has been approved.';
        });
    }

    decline() {
        this.qrService.decline(this.authCode).then(r => {
            this.declineMessage = 'The authorization has been declined.';
        });
    }
}