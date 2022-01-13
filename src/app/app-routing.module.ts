import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBodyComponent } from './component/list-body/list-body.component';
import { ContactBodyComponent } from './component/kontakt/contact-body/contact-body.component';
import { ServerComponent } from "./component/server/server.component";
import { FaqComponent } from './component/faq/faq.component';
import { ServerResolver } from './resolver/server/server.resolver';
import { RegulaminComponent } from './component/regulamin/regulamin.component';
import {LoginComponent} from "./component/login/login/login.component";
import {UserDashboardComponent} from "./component/login/user-dashboard/user-dashboard.component";
import {AuthGuard} from "./services/guard/auth.guard";
import {RegisterComponent} from "./component/login/register/register.component";
import {DefaultComponent} from "./component/list-body/default/default.component";
import { Err404Component } from './component/err404/err404.component';


const routes: Routes = [
  {path: '', component: ListBodyComponent, children: [
      {path: '', component: DefaultComponent},
      {path: 'page/:page', component: DefaultComponent},
      {path: 'version/:versions', component: DefaultComponent},
      {path: 'category/:categories', component: DefaultComponent},
      {path: 'search', component: DefaultComponent}
    ]},
  {path: 'kontakt', component: ContactBodyComponent},
  {path: 'server/:id', component: ServerComponent, resolve:{completeServer:ServerResolver}},
  {path: 'faq', component: FaqComponent},
  {path: 'regulamin', component: RegulaminComponent},
  {path: '404', component: Err404Component},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
