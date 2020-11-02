import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
    subscriptions:any;

  constructor(
      private http:HttpClient
  ) { }

  ngOnInit(): void {
      this.http.get(`/api/subscription`)
        .subscribe((docs) => {
            this.subscriptions = docs;
        })
  }

  formatDate(date, time = false){
      if(time) return new Date(date).toLocaleString();
      return new Date(date).toLocaleDateString();
  }
}
