import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    authToken:String;
    user:any;

    constructor(
        private http:HttpClient,
        private cookieService:CookieService
    ) {}

    updateUser(data){
        this.user = data.user;
        this.authToken = data.authToken;
        var date = new Date();
        date.setFullYear(date.getFullYear() +10);
        this.cookieService.set(
            "fleksAuth",
            data.authToken,
            date,
            "/",
            null,
            false,
            'Lax'
        );
    }

    formatHttpError(err){
        if(err.error != null && err.error.message) return `${err.error.message}`;
        if(err.error == null && err.statusText) return `${err.statusText}`;
        if(err.statusText != null) return `${err.statusText}`
        if(err.error != null) return `${err.error}`
        console.error(err);

        return `Unknown error, contact support!`;
    }
}
