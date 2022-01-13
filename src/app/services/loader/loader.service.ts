import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  static isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
