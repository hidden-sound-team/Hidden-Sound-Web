// ** HttpGateway **

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppConfig } from '../../app/app.config';
import { AuthTokenService } from '../app/auth-token.service';

export class ApiHttpOptions {
    method: RequestMethod;
    url: string;
    headers: any = {};
    params = {};
    data = {};
}

@Injectable()
export class ApiHttpService {

    // Define the internal Subject we'll use to push the command count
    private pendingCommandsSubject = new Subject<number>();
    private pendingCommandCount = 0;

    // Provide the *public* Observable that clients can subscribe to
    private pendingCommands$: Observable<number>;

    constructor(private http: Http, private router: Router, private config: AppConfig, private authToken: AuthTokenService) {
        this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }

    // Http overrides 
    // -------------------

    get(url: string, params?: any): Observable<Response> {
        let options = new ApiHttpOptions();

        this.addBearerToken(options);

        return this.http.get(this.createApiUrl(url), options);
    }

    post(url: string, data?: any, params?: any): Observable<Response> {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiHttpOptions();
        options.method = RequestMethod.Post;
        options.url = this.createApiUrl(url);
        options.params = params;
        options.data = JSON.stringify(data);

        this.addContentType(options);

        return this.request(options);
    }

    postForm(url: string, data?: any): Observable<Response> {
        let options = new ApiHttpOptions();
        options.method = RequestMethod.Post;
        options.url = this.createApiUrl(url);
        options.data = this.buildUrlSearchParams(data);

        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        return this.request(options);
    }

    put(url: string, data?: any, params?: any): Observable<Response> {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiHttpOptions();
        options.method = RequestMethod.Put;
        options.url = this.createApiUrl(url);
        options.params = params;
        options.data = JSON.stringify(data);

        this.addContentType(options);

        return this.request(options);
    }

    delete(url: string, params?: any): Observable<Response> {
        let options = new ApiHttpOptions();
        options.method = RequestMethod.Delete;
        options.url = this.createApiUrl(url);
        options.params = params;

        this.addContentType(options);

        return this.request(options);
    }


    // Internal methods
    // --------------------

    private createApiUrl(path: string): string {
        return this.config.getConfig('apiUrl') + path;
    }

    private request(options: ApiHttpOptions): Observable<any> {
        console.log(options.url);
        options.method = (options.method || RequestMethod.Get);
        options.url = (options.url || '');
        options.headers = (options.headers || {});
        options.params = (options.params || {});
        options.data = (options.data || {});

        console.log(options.url);

        this.interpolateUrl(options);
        this.addXsrfToken(options);
        this.addBearerToken(options);

        console.log(options.url);

        let requestOptions = new RequestOptions();
        requestOptions.method = options.method;
        requestOptions.url = options.url;
        requestOptions.headers = options.headers;
        requestOptions.search = this.buildUrlSearchParams(options.params);
        requestOptions.body = options.data;

        console.log(requestOptions.url);

        let isCommand = (options.method !== RequestMethod.Get);

        if (isCommand) {
            this.pendingCommandsSubject.next(++this.pendingCommandCount);
        }

        let stream = this.http.request(options.url, requestOptions)
            .catch((error: any) => {
                this.handleError(error);
                return Observable.throw(error);
            })
            .catch((error: any) => {
                return Observable.throw(error);
            })
            .finally(() => {
                if (isCommand) {
                    this.pendingCommandsSubject.next(--this.pendingCommandCount);
                }
            });
            
        console.log(options.url);
        console.log(requestOptions.url);

        return stream;
    }


    private addContentType(options: ApiHttpOptions): ApiHttpOptions {
        if (options.method !== RequestMethod.Get) {
            options.headers['Content-Type'] = 'application/json; charset=UTF-8';
        }
        return options;
    }

    private addBearerToken(options: ApiHttpOptions): ApiHttpOptions {
        if (this.authToken.getAccessToken()) {
            options.headers.Authorization = 'Bearer ' + this.authToken.getAccessToken();
        }
        return options;
    }

    private extractValue(collection: any, key: string): any {
        let value = collection[key];
        delete (collection[key]);
        return value;
    }

    private addXsrfToken(options: ApiHttpOptions): ApiHttpOptions {
        let xsrfToken = this.getXsrfCookie();
        if (xsrfToken) {
            options.headers['X-XSRF-TOKEN'] = xsrfToken;
        }
        return options;
    }

    private getXsrfCookie(): string {
        let matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
        try {
            return (matches && decodeURIComponent(matches[1]));
        } catch (decodeError) {
            return ('');
        }
    }

    private addCors(options: ApiHttpOptions): ApiHttpOptions {
        options.headers['Access-Control-Allow-Origin'] = '*';
        return options;
    }

    private buildUrlSearchParams(params: any): URLSearchParams {
        let searchParams = new URLSearchParams();
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams;
    }

    private interpolateUrl(options: ApiHttpOptions): ApiHttpOptions {
        options.url = options.url.replace(/:([a-zA-Z]+[\w-]*)/g, ($0, token) => {
            // Try to move matching token from the params collection.
            if (options.params.hasOwnProperty(token)) {
                return (this.extractValue(options.params, token));
            }
            // Try to move matching token from the data collection.
            if (options.data.hasOwnProperty(token)) {
                return (this.extractValue(options.data, token));
            }
            // If a matching value couldn't be found, just replace
            // the token with the empty string.
            return ('');
        });
        // Clean up any repeating slashes.
        options.url = options.url.replace(/\/{2,}/g, '/');
        // Clean up any trailing slashes.
        options.url = options.url.replace(/\/+$/g, '');

        return options;
    }

    private handleError(error: any) {
        if (error.status === 401) {
            // use DI to abstract this
            // sessionStorage.clear();
            this.router.navigate(['/login']);
        }
    } 

    private unwrapHttpError(error: any): any {
        try {
            return (error.json());
        } catch (jsonError) {
            return ({
                code: -1,
                message: 'An unexpected error occurred.'
            });
        }
    }

    private unwrapHttpValue(value: Response): any {
        return (value.json());
    }
}
