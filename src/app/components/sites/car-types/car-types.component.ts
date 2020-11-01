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
    cars:any[];

    constructor(
        private dialog: MatDialog,
        private http: HttpClient,
        private backendService:BackendService
    ) { }

    ngOnInit(): void {
        this.http.get(`/api/car-type`)
            .subscribe((docs:any[]) => {
                this.cars = docs;
            })
    }

    edit(car){
        car.form = this.createForm(car);
        car.formGroup = this.createFormGroup(car.form);
        this.openCar(car);
    }

    newCar(){
        var form = this.createForm();
        var formGroup = this.createFormGroup(form);
        this.openCar({
            form: form,
            formGroup: formGroup
        })
    }

    openCar(car = undefined){
        const dialogRef = this.dialog.open(AddCarComponent, {
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

    createFormGroup(form){
        var formOptions:any = {};
        form.forEach((item) => {
            formOptions[item.key] = item.control;
        })

        return new FormGroup(formOptions);
    }

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


// Add car dialog
@Component({
    templateUrl: 'add-car.component.html',
})
export class AddCarComponent {
    error:string;
    formGroup:FormGroup;

    constructor(
        private dialogRef: MatDialogRef<AddCarComponent>,
        private http: HttpClient,
        private backendService: BackendService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    close() {
        this.dialogRef.close();
    }

    add(){
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
