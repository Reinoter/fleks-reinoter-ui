import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    cars:any[]; //Current car types list.
    constructor(
        private http: HttpClient
    ) {}

    /* Initialize car list each time component is rendered */
    ngOnInit(): void {
        this.http.get(`/api/car-type`)
        .subscribe((docs:any[]) => {
            this.cars = docs;
        })
    }

}
