import { Component, OnInit } from '@angular/core';

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
  constructor() {
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

}
