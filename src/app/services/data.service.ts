import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedResponse} from "../model/PagedResponse";
import {CompleteServer} from "../model/CompleteServer";
import {EmailRequest} from "../model/EmailRequest";
import {Auth} from "../model/Auth";
import {AuthResponse} from "../model/AuthResponse";

const baseUrl: string = "https://api.jbwm.pl/api/serverlist";
const authUrl: string = "https://api.jbwm.pl/api/authenticate";
const tokenUrl: string = "https://api.jbwm.pl/api/refresh";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {

  }
  //bierze podstawowe informacje o serwerze, do wyswietlania listy.
  public getBasicServerInfo(params: any): Observable<PagedResponse> {
    return this.httpClient.get<PagedResponse>(baseUrl + "/servers", { params });
  }
  //po idku bierze serwer i oddaje wszystkie informacje.
  public getFullServerInfo(id: number): Observable<CompleteServer>{
    return this.httpClient.get<CompleteServer>(baseUrl + "/servers/" + id);
  }

  public createServer(hostname: string, port: number): Observable<any>{
    let params = new HttpParams().set('hostname', hostname).append('port', port);
    return this.httpClient.post(baseUrl + "/create", {}, { params });
  }

  public recommendServer(id: number, nick: string, captcha: string) : Observable<any>{
    let params = new HttpParams().set('id', id).append('name', nick).append('g-recaptcha-response', captcha);
    return this.httpClient.post<Observable<any>>(baseUrl + "/recommend", {}, {params});
  }

  public sendEmail(emailRequest: EmailRequest, captcha: string) : Observable<any>{
    let params = new HttpParams().set('g-recaptcha-response', captcha);
    return this.httpClient.post<Observable<any>>(baseUrl + "/email", emailRequest, {params}, );
  }

  public auth(username: string, password: string, captcha: string) : Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(authUrl, new Auth(username, password, captcha));
  }

  public refreshToken(refreshToken: string) : Observable<AuthResponse>{
    let headers = new HttpHeaders().set("Authorization", "Bearer " + refreshToken);
    return this.httpClient.get<AuthResponse>(tokenUrl, {headers})
  }
}
