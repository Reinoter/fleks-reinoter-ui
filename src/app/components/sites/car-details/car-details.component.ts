import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  car:any;
  sub:any;
  minDate:Date;

  constructor(
      private route: ActivatedRoute,
      private router:Router,
      private http: HttpClient
  ) {
      this.sub = route.params.subscribe(p => this.initCar(p['id']))
  }

  ngOnInit(): void {
      this.minDate = new Date();
  }
  
  ngOnDestroy(){
      this.sub.unsubscribe();
  }
  initCar(id){
      this.http.get(`/api/car-type/id/${id}`)
        .subscribe((doc) => {
            console.log("Got car", doc);
            this.car = doc;
        })
  }

}
