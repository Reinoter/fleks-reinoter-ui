import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscriptions-details',
  templateUrl: './subscriptions-details.component.html',
  styleUrls: ['./subscriptions-details.component.scss']
})
export class SubscriptionsDetailsComponent implements OnInit {
subscription:any;
sub:any;
  constructor(
      private route: ActivatedRoute,
      private http: HttpClient
  ) {
      this.sub = route.params.subscribe(p => this.initSubscription(p['id']))
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }

  initSubscription(id){
      this.http.get(`/api/subscription/id/${id}`)
        .subscribe((doc) => {
            console.log("Got sub", doc);
            this.subscription = doc;
        })
  }

  formatDate(date){
      return new Date(date).toLocaleString();
  }

}
