import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { ListBodyComponent } from './component/list-body/list-body.component';
import { ContactBodyComponent } from './component/kontakt/contact-body/contact-body.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';
import { ServerComponent } from './component/server/server.component';
import { FaqComponent } from './component/faq/faq.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {InterceptorService} from "./services/interceptor/interceptor.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegulaminComponent } from './component/regulamin/regulamin.component';
import { LoginComponent } from './component/login/login/login.component';
import { UserDashboardComponent } from './component/login/user-dashboard/user-dashboard.component';
import { RegisterComponent } from './component/login/register/register.component';
import { SearchInputComponent } from './component/list-body/search-input/search-input.component';
import { ServerBlockComponent } from './component/list-body/server-block/server-block.component';
import { DefaultComponent } from './component/list-body/default/default.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingTemplateComponent } from './component/list-body/loading-template/loading-template.component';
import { ChartComponent } from './component/server/chart/chart.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {ServerListEffects} from "./reducers/server-list.effects";
import { Err404Component } from './component/err404/err404.component';
import {NullToDotted, PortCut} from "./component/list-body/portCut.pipe";
import { HeaderComponent } from './component/server/header/header/header.component';
import { HeaderMobileComponent } from './component/server/header-mobile/header-mobile/header-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ListBodyComponent,
    ContactBodyComponent,
    ServerComponent,
    FaqComponent,
    NotFoundComponent,
    RegulaminComponent,
    LoginComponent,
    UserDashboardComponent,
    RegisterComponent,
    SearchInputComponent,
    ServerBlockComponent,
    DefaultComponent,
    LoadingTemplateComponent,
    ChartComponent,
    Err404Component,
    PortCut,
    NullToDotted,
    HeaderComponent,
    HeaderMobileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxCaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ServerListEffects])
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
