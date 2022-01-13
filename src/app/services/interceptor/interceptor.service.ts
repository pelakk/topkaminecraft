import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoaderService} from "../loader/loader.service";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    LoaderService.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(() => {
        LoaderService.isLoading.next(false);
      })
    )

  }
}
