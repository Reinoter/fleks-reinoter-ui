import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '@services';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    blockReq(){
        return new Promise(async (resolve, reject) => {
                while(this.userService._returned == false || this.userService._returned == undefined){
                  console.log("waiting for authentication");
                    await this.userService.sleep(1000);
                }
                resolve();
        })
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            var roles = next.data["roles"] as Array<string>;
            return new Observable<boolean>((observer) => {
                //If everyone has access to page
                if(roles[0] && roles[0] == "*"){
                    observer.next(true);
                    observer.complete();
                    return;
                }

                this.blockReq()
                    .then(() => {
                        if(this.userService.hasAccess(roles)){
                            //Letting user through
                            observer.next(true);
                            observer.complete();
                        }else{
                            //Stopping user from entering page
                            this.router.navigate(['/login']);
                            observer.next(false);
                            observer.complete();
                        }
                    })
                    .catch(e => console.error(e));
            });
        }
    }
