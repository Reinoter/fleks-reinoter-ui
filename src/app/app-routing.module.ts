import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    LoginComponent,
    CarTypesComponent
 } from '@sites';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cars', component: CarTypesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
