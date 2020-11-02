import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from "@services";
import { fadeAnimation } from '@animations';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeAnimation]
})
export class AppComponent {
    sub:any; //Refrence to router observable
    constructor(
        private http:HttpClient,
        private cookieService: CookieService,
        private backendService: BackendService,
        private router: Router
    ){
        //Making sure browser scrolls to the top of website on navigation.
        this.sub = this.router.events
        .pipe(
            filter(event => event instanceof NavigationEnd)
        )
        .subscribe(event => {
            var el = document.getElementById("page");
            window.scroll(0, 0);
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    /* Triggers router animation */
    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
