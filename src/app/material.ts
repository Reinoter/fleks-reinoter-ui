import { NgModule } from '@angular/core';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatRippleModule, RippleGlobalOptions, MAT_RIPPLE_GLOBAL_OPTIONS} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
      MatDialogModule,
      MatButtonModule
  ],
  exports:[
      MatDialogModule,
      MatButtonModule
  ],
  providers: [
      {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
})
export class MaterialModule { }
