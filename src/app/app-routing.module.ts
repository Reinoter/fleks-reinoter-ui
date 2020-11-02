import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    LoginComponent,
    CarTypesComponent,
    HomeComponent,
    CarDetailsComponent
 } from '@sites';

const routes: Routes = [
    { path: '', component: HomeComponent, data: {animation: '1'} },
    { path: 'login', component: LoginComponent, data: {animation: '2'} },
    { path: 'cars', component: CarTypesComponent, data: {animation: '3'} },
    { path: 'cars/:id', component: CarDetailsComponent, data: {animation: '4'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
