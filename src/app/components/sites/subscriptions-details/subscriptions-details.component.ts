import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-subscriptions-details',
    templateUrl: './subscriptions-details.component.html',
    styleUrls: ['./subscriptions-details.component.scss']
})
export class SubscriptionsDetailsComponent implements OnInit {
    subscription:any; //Current subscription data
    sub:any; //Refrence to router observable

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient
    ) {
        // Initializing subscription data each time route is navigated too.
        this.sub = route.params.subscribe(p => this.initSubscription(p['id']))
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
    }

    /* Initialize subscription based on id*/
    initSubscription(id){
        this.http.get(`/api/subscription/id/${id}`)
        .subscribe((doc) => {
            this.subscription = doc;
        })
    }

    /* Format date */
    formatDate(date){
        return new Date(date).toLocaleString();
    }

}
