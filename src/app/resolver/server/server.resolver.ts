import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompleteServer } from 'src/app/model/CompleteServer';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ServerResolver implements Resolve<CompleteServer> {

  constructor(private dataService: DataService,
              private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompleteServer> | CompleteServer {
    return this.dataService.getFullServerInfo(route.params.id)
      .pipe(catchError((err) => {
        this.router.navigate(['/404']);
        return new Observable<CompleteServer>(err);
      }));
  }
}
