import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-subscriptions',
    templateUrl: './subscriptions.component.html',
    styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
    subscriptions:any; //Current subscriptions for the user

    constructor(
        private http:HttpClient
    ) { }

    /* Initialize subscription list each time component is rendered */
    ngOnInit(): void {
        this.http.get(`/api/subscription`)
        .subscribe((docs) => {
            this.subscriptions = docs;
        })
    }

    /* Format date */
    formatDate(date, time = false){
        if(time) return new Date(date).toLocaleString();
        return new Date(date).toLocaleDateString();
    }
}
