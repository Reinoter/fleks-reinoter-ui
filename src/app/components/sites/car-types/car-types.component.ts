import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { BackendService } from '@services';

@Component({
    selector: 'app-car-types',
    templateUrl: './car-types.component.html',
    styleUrls: ['./car-types.component.scss']
})
export class CarTypesComponent implements OnInit {
    cars:any[]; //current cars details

    constructor(
        private dialog: MatDialog,
        private http: HttpClient,
        private backendService:BackendService
    ) { }

    /*
    Initializing each time component is loaded.
    */
    ngOnInit(): void {
        this.http.get(`/api/car-type`)
        .subscribe((docs:any[]) => {
            this.cars = docs;
        })
    }

    /*
    1. Initialize form for existing document
    2. Opening dialog with said form.
    */
    edit(car){
        car.form = this.createForm(car);
        car.formGroup = this.createFormGroup(car.form);
        this.openCar(car);
    }

    /*
    1. Initialize form without existing document.
    2. Opening dialog with said document
    */
    newCar(){
        var form = this.createForm();
        var formGroup = this.createFormGroup(form);
        this.openCar({
            form: form,
            formGroup: formGroup
        })
    }

    /*
    Opening dialog with form/document
    */
    openCar(car = undefined){
        const dialogRef = this.dialog.open(CarDialog, {
            panelClass: "dialog-responsive",
            data: car
        });
        dialogRef.afterClosed().subscribe(result => {
            if(!result) return;
            let idx = this.cars.indexOf(car);
            if(idx == -1) this.cars.push(result);
            if(idx != -1) this.cars[idx] = result;
        });
    }

    /*
    - Uses Form created by createForm();
    Creating FormGroup used in the Angular form control.
    */
    createFormGroup(form){
        var formOptions:any = {};
        form.forEach((item) => {
            formOptions[item.key] = item.control;
        })
        return new FormGroup(formOptions);
    }

    /*
    Creating form in array format so that it can be rendered
    using *ngFor.
    */
    createForm(object:any = {}){
        let form = [{
            label: "Name*",
            key: "name",
            control: new FormControl(object.name, [Validators.required])
        },{
            label: "Price*",
            key: "price",
            control: new FormControl(object.price, [Validators.required])
        },{
            label: "Model year*",
            key: "modelYear",
            control: new FormControl(object.modelYear, [Validators.required])
        },{
            label: "Transmission type*",
            key: "transmissionType",
            control: new FormControl(object.transmissionType, [Validators.required])
        },{
            label: "Fuel type*",
            key: "fuelType",
            control: new FormControl(object.fuelType, [Validators.required])
        },{
            label: "Trunkspace*",
            key: "trunkSpace",
            control: new FormControl(object.trunkSpace, [Validators.required])
        },{
            label: "Image",
            key: "image",
            control: new FormControl(object.image, [Validators.required])
        }]

        return form;
    }

}


/*
Dialog for creating/updating car.
*/
@Component({
    templateUrl: 'add-car.component.html',
})
export class CarDialog {
    error:string; //http error

    constructor(
        private dialogRef: MatDialogRef<CarDialog>,
        private http: HttpClient,
        private backendService: BackendService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    /* Close dialog */
    close() {
        this.dialogRef.close();
    }

    /*
    This function uses either uses POST/PUT to update car if _id field is
    defined in the dialog data.
    */
    confirm(){
        this.error = undefined;
        if(this.data.formGroup.status == "INVALID") return this.error = "Please fill out the form";

        var body = {};
        this.data.form.forEach((item) => {
            body[item.key] = this.data.formGroup.value[item.key];
        })

        let method = this.data._id?'POST':'PUT';
        let url = this.data._id?`/api/car-type/id/${this.data._id}`:`/api/car-type`;

        this.http.request(method, url, {body: body})
        .subscribe((carType) => {
            this.dialogRef.close(carType);
        }, (e) => {
            this.error = this.backendService.formatHttpError(e);
        })

    }
}
