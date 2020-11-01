import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from "@services";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private http:HttpClient,
        private cookieService: CookieService,
        private backendService: BackendService
    ){
        if(!this.cookieService.check('fleksAuth')) return
        this.backendService.authToken = this.cookieService.get('fleksAuth');
        this.http.post(`/api/user/login`, {})
            .subscribe((data) => {
                this.backendService.updateUser(data);
            }, (e) => {
                console.error(this.backendService.formatHttpError(e));
            })
    }
}
