import { Component, OnInit } from '@angular/core';
import { BackendService } from '@services';
import { HttpClient } from  '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormError:string;
  regFormError:string;
  loginForm:FormGroup;
  regForm:FormGroup;

  constructor(
      private backendService: BackendService,
      private http: HttpClient,
      private router: Router
  ) {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });

      this.regForm = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required]),
          passwordRepeat: new FormControl('', [Validators.required])
      });
  }

  ngOnInit(): void {
      if(this.backendService.authToken) this.router.navigate(['/']);
  }

  login(){
      this.loginFormError = undefined;
      if(this.loginForm.status == "INVALID") return this.loginFormError = "Please fill out the form";

      this.http.post(`/api/user/login`, {
          email: this.loginForm.value["email"],
          password: this.loginForm.value["password"]
      })
        .subscribe((data) => {
            this.backendService.updateUser(data);
            this.router.navigate(['/']);
        }, e => this.loginFormError = this.backendService.formatHttpError(e))
  }

  register(){
      this.regFormError = undefined;
      if(this.regForm.status == "INVALID") return this.regFormError = "Please fill out the form";
      if(this.regForm.value["password"] != this.regForm.value["passwordRepeat"]){
          this.regForm.controls["password"].setValue(undefined);
          this.regForm.controls["passwordRepeat"].setValue(undefined);
          return this.regFormError = "Your passwords did not match";
      }

      this.http.put(`/api/user`, {
          email: this.regForm.value["email"],
          password: this.regForm.value["password"]
      })
        .subscribe((data) => {
            this.backendService.updateUser(data);
            this.router.navigate(['/']);
        }, (err) => {
            this.regFormError = this.backendService.formatHttpError(err);
        })
  }

}
