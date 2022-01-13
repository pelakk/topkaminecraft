import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import jwtDecode, {JwtPayload} from "jwt-decode";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private dataService: DataService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("access_token")) {
      if (!this.isExpired(localStorage.getItem("access_token") as string)) {
        return true;
      } else {
        this.dataService.refreshToken(localStorage.getItem("refresh_token") as string).subscribe(response => {
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
          return true;
        })
      }
    }
    this.router.navigate(['/404']);
    return false;
  }


  isExpired(token: string) {
    let decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
    let now = new Date().getTime() / 1000;
    return now > (decodedToken.exp as number);

  }


}
