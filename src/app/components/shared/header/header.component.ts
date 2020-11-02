import { Component, OnInit } from '@angular/core';
import { BackendService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    routes:{
        path: String,
        icon: String
    }[];
  constructor(
      public backendService: BackendService,
      private cookieService: CookieService,
      private router: Router,
      private http: HttpClient
  ) {
      this.routes = [{
          path: "/",
          icon: "fa-home"
      }, {
          path: "/subscriptions",
          icon: "fa-calendar-alt"
      }, {
          path: "/cars",
          icon: "fa-car"
      }]
  }

  ngOnInit(): void {
  }

  access(routes){
      return routes.filter(route => {
          return true;
      })
  }

  logout(){
      this.http.get(`/api/user/logout`)
        .subscribe(() => {
            this.cookieService.delete('fleksAuth');
            this.backendService.authToken = undefined;
            this.cookieService.set(
                "fleksAuth",
                null,
                null,
                "/",
                null,
                false,
                'Lax'
            );
            this.router.navigate(["/"])
        })
  }

}
