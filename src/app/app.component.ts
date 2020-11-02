import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from "@services";
import { slideInAnimation } from '@animations';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInAnimation]
})
export class AppComponent {
    routed_count:number;
    constructor(
        private http:HttpClient,
        private cookieService: CookieService,
        private backendService: BackendService
    ){
        this.routed_count = 0;
        if(!this.cookieService.check('fleksAuth')) return
        if(this.cookieService.get('fleksAuth') == "null") return;

        this.backendService.authToken = this.cookieService.get('fleksAuth');
        console.log("reauth ", this.backendService.authToken);
        this.http.post(`/api/user/login`, {})
            .subscribe((data) => {
                this.backendService.updateUser(data);
            }, (e) => {
                console.error(this.backendService.formatHttpError(e));
            })
    }

    prepareRoute(outlet: RouterOutlet) {
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
