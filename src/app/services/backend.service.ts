import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


/* Service to store user data */
@Injectable({
    providedIn: 'root'
})
export class BackendService {
    authToken:String; // Json Web Token
    user:any; //User data

    constructor(
        private http:HttpClient,
        private cookieService:CookieService
    ) {}

    /*
        Updating storage as well as the cookie used to remember login session.
    */
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

    /* Formatting the HTTP Error given by Angulars HTTP Client */
    formatHttpError(err){
        if(err.error != null && err.error.message) return `${err.error.message}`;
        if(err.error == null && err.statusText) return `${err.statusText}`;
        if(err.statusText != null) return `${err.statusText}`
        if(err.error != null) return `${err.error}`
        console.error(err);

        return `Unknown error, contact support!`;
    }
}
