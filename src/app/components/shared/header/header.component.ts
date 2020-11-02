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
        icon: String,
        user: Boolean
    }[];
  constructor(
      public backendService: BackendService,
      private cookieService: CookieService,
      private router: Router,
      private http: HttpClient
  ) {

      // Navigation routes
      this.routes = [{
          path: "/",
          icon: "fa-home",
          user: false
      }, {
          path: "/subscriptions",
          icon: "fa-calendar-alt",
          user: true
      }, {
          path: "/cars",
          icon: "fa-car",
          user: true
      }]
  }

  ngOnInit(): void {
  }


  /*
    Removing navigation routes that is not available to user.
  */
  access(routes){
      return routes.filter(route => {
          if(!route.user) return true;
          if(route.user && this.backendService.authToken) return true;
      })
  }

  /*
    1. Ending session in express backend.
    2. Deleting userdata
    3. Overwriting cookie to make sure its removed from browser.
  */
  logout(){
      this.http.get(`/api/user/logout`)
        .subscribe(() => {
            this.backendService.authToken = undefined;
            this.backendService.user = undefined;
            this.cookieService.delete('fleksAuth');
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
