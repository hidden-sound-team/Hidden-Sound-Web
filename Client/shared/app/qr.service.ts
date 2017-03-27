import { ApiHttpService } from './../http/http-api.service';
import { Injectable } from '@angular/core';

export class TransactionCreateResponse {
    authorizationCode: string;
    base64QR: string;
}

export class TransactionAuthorizeRequest {
    authorizationCode: string;
}

@Injectable()
export class QRService {
    // apiHttp: ApiHttpService;
    constructor( private apiHttp: ApiHttpService ) { };

    createTransaction(): Promise<TransactionCreateResponse> {
        return new Promise((resolve, reject) => {
            this.apiHttp.post('/Api/Authorization/Create')
                .subscribe(response => {
                    resolve(<TransactionCreateResponse>response.json());
                },
                error => {
                    reject(error);
                });
        });
    }

    approve(authorizationCode: string){
        let request = new TransactionAuthorizeRequest();
        request.authorizationCode = authorizationCode;

        return new Promise((resolve, reject) => {
            this.apiHttp.postForm('/Api/Authorization/Approve', request)
                .subscribe(response => {
                    resolve();
                },
                error => {
                    reject(error);
                });
        });
    }

    decline(authorizationCode: string) {
        let request = new TransactionAuthorizeRequest();
        request.authorizationCode = authorizationCode;
        
        return new Promise((resolve, reject) => {
            this.apiHttp.postForm('/Api/Authorization/Decline', request)
                .subscribe(response => {
                    resolve();
                },
                error => {
                    reject(error);
                });
        });
    }
}
