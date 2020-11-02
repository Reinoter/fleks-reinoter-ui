import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    cars:any[];
    constructor(
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.http.get(`/api/car-type`)
        .subscribe((docs:any[]) => {
            this.cars = docs;
        })
    }

}
