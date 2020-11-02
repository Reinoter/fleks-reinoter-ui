import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material';

import { AppComponent } from './app.component';
import {
    HeaderComponent,
    ButtonComponent
} from '@shared';
import {
    LoginComponent,
    CarTypesComponent,
    AddCarComponent,
    HomeComponent
} from '@sites';

import { BackendService } from '@services';
import { TokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        CarTypesComponent,
        ButtonComponent,
        AddCarComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    entryComponents: [AddCarComponent],
    providers: [
        CookieService,
        BackendService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
