import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BackendService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private backendService: BackendService,
        private router: Router,
        private cookieService: CookieService,
        private http: HttpClient
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            var roles = next.data["roles"] as Array<string>;
            return new Observable<boolean>((observer) => {
                if(!this.backendService.authToken && this.cookieService.check('fleksAuth') && this.cookieService.get('fleksAuth') != "null"){
                    // Auth token is undefined, but its cookie has been set. Using that to login and update user data on return to page
                    this.backendService.authToken = this.cookieService.get('fleksAuth');
                    this.http.post(`/api/user/login`, {})
                        .subscribe((data) => {
                            // Update cookie and userdata
                            this.backendService.updateUser(data);
                            observer.next(true);
                            observer.complete();
                        }, (e) => {
                            // If cookie is invalid, delete it and current userdata
                            this.backendService.authToken = undefined;
                            this.backendService.user = undefined;
                            this.cookieService.delete('fleksAuth');
                            console.error(this.backendService.formatHttpError(e));
                            if(roles[0] && roles[0] == "*"){
                                // If route doesn't require login, allow user through anyway
                               observer.next(true);
                               observer.complete();
                           }else{
                               observer.next(false);
                               observer.complete();
                               this.router.navigate(['login'])
                           }
                        })
                }else if(this.backendService.authToken){
                    // Auth token is defined
                    observer.next(true);
                    observer.complete();
                }else if(roles[0] && roles[0] == "*"){
                    // Auth token is not defined, but its not needed for this route
                    observer.next(true);
                    observer.complete();
                }else{
                    // Auth token is not defined, and cookie is not defined, redirecting to login
                    observer.next(false);
                    observer.complete();
                    this.router.navigate(['login'])
                }
            });
        }
    }
