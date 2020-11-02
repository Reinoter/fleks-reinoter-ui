import { NgModule } from '@angular/core';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatRippleModule, RippleGlobalOptions, MAT_RIPPLE_GLOBAL_OPTIONS} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [
      MatDialogModule,
      MatButtonModule,
      MatDatepickerModule
  ],
  exports:[
      MatDialogModule,
      MatButtonModule,
      MatDatepickerModule
  ],
  providers: [
      {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
})
export class MaterialModule { }
