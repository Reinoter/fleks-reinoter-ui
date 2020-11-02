import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from './guards'
import {
    LoginComponent,
    CarTypesComponent,
    HomeComponent,
    CarDetailsComponent,
    SubscriptionsComponent,
    SubscriptionsDetailsComponent
 } from '@sites';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [RoleGuard], data: {animation: '1', roles :['*']}},
    { path: 'login', component: LoginComponent, canActivate: [RoleGuard], data: {animation: '2', roles :['*']} },
    { path: 'cars', component: CarTypesComponent, canActivate: [RoleGuard], data: {animation: '3', roles :['']} },
    { path: 'cars/:id', component: CarDetailsComponent, canActivate: [RoleGuard], data: {animation: '4', roles :['']} },
    { path: 'subscriptions', component: SubscriptionsComponent, canActivate: [RoleGuard], data: {animation: '5', roles :['']} },
    { path: 'subscriptions/:id', component: SubscriptionsDetailsComponent, canActivate: [RoleGuard], data: {animation: '6', roles :['']} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
