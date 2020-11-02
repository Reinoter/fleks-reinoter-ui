import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    LoginComponent,
    CarTypesComponent,
    HomeComponent,
    CarDetailsComponent,
    SubscriptionsComponent,
    SubscriptionsDetailsComponent
 } from '@sites';

const routes: Routes = [
    { path: '', component: HomeComponent, data: {animation: '1'} },
    { path: 'login', component: LoginComponent, data: {animation: '2'} },
    { path: 'cars', component: CarTypesComponent, data: {animation: '3'} },
    { path: 'cars/:id', component: CarDetailsComponent, data: {animation: '4'} },
    { path: 'subscriptions', component: SubscriptionsComponent, data: {animation: '5'} },
    { path: 'subscriptions/:id', component: SubscriptionsDetailsComponent, data: {animation: '6'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
