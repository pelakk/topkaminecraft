import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InvisibleReCaptchaComponent} from "ngx-captcha";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  alert: boolean = false;
  // siteKey: string = "6LfrCTgdAAAAAALzu1p8z0CAeSoB-Z7zLxyrqgI3";
  siteKey: string = "6Ld-RrMdAAAAANLczLSCrXk1GO2RCeRTPDTGdi-Q";
 //  siteKey: string = "6LdrDDgdAAAAANHQD0xKfzCkyi5NBtb-EkMgGNWg";
  recaptcha!: FormGroup;

  constructor(private dataService: DataService, private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.recaptcha = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  authUser(email: string, password: string, captcha: InvisibleReCaptchaComponent) {
    this.dataService.auth(email, password, (captcha.getCurrentResponse() as string)).subscribe(response => {

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      this.router.navigate(['/dashboard'])
    }, error =>{
      console.log(error);
      this.alert = true;
    });
  }
}
