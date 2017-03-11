import { ApiHttpService } from './../http/http-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class QRService {
    // apiHttp: ApiHttpService;
    constructor( private apiHttp: ApiHttpService ) { };

    createTransaction() {
        return new Promise((resolve, reject) => {
            this.apiHttp.post( '/Api/Transaction/Create' )
                .subscribe( response => {
                    resolve(response.text());
                },
                error => {
                    reject(error);
                });
        });
    }
}