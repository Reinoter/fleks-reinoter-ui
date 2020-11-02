/* External imports */
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendService } from '@services';
import { environment } from '@environment';

/* Interceptor to add authentication token and baseUri all requests. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public backendService: BackendService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ url: `${environment.backendApi}${req.url}` });
        if(!this.backendService.authToken) return next.handle(req);
        return next.handle(
            req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.backendService.authToken}`
                }
            })
        );
}
}
