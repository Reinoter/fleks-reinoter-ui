import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '@services';

@Component({
    selector: 'app-car-details',
    templateUrl: './car-details.component.html',
    styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
    sub:any; //Refrence to router observable
    car:any; //current car details
    minDate:Date; //min date for delivery
    subscriptionForm:FormGroup; //form control
    error:string; //subscription error

    constructor(
        private route: ActivatedRoute,
        private router:Router,
        private http: HttpClient,
        private backendService: BackendService
    ) {
        // Initializing car data each time route is navigated too.
        this.sub = route.params.subscribe(p => this.initCar(p['id']))
        this.subscriptionForm = new FormGroup({
            deliveryDate: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
        })
    }

    ngOnInit(): void {
        this.minDate = new Date();
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

      /* Initialize car based on ID*/
    initCar(id){
        this.http.get(`/api/car-type/id/${id}`)
        .subscribe((doc) => {
            this.car = doc;
        })
    }

    /*
    Creating subscription for user.
    User data and order creation date is added on the backend side.
    */
    subscribe(){
        this.error = undefined;
        if(this.subscriptionForm.status == "INVALID") return this.error = "Please fill out the form";

        this.http.put(`/api/subscription`, {
            deliveryDate: this.subscriptionForm.value['deliveryDate'],
            address: this.subscriptionForm.value['address'],
            car: this.car._id
        })
        .subscribe((subscription:any) => {
            this.router.navigate(['/subscriptions', subscription._id])
        }, (e) => {
            this.error = this.backendService.formatHttpError(e);
        })
    }
}
