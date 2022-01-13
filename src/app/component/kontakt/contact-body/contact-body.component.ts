import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {EmailRequest} from "../../../model/EmailRequest";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InvisibleReCaptchaComponent} from "ngx-captcha";

enum SendStatus {
  NOT_YET,
  SUCCESSFULLY,
  ERROR
}

@Component({
  selector: 'app-contact-body',
  templateUrl: './contact-body.component.html',
  styleUrls: ['./contact-body.component.scss']
})
export class ContactBodyComponent implements OnInit {

  public recaptcha!: FormGroup;
  siteKey: string = "6Ld-RrMdAAAAANLczLSCrXk1GO2RCeRTPDTGdi-Q";
  status: SendStatus = SendStatus.NOT_YET;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.recaptcha = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  sendEmail(topic: string, content: string, captcha: InvisibleReCaptchaComponent){
    this.dataService.sendEmail(new EmailRequest("MCTopka Nowa wiadomosc od " + topic, content), (captcha.getCurrentResponse() as string)).subscribe(response => {
      this.status = SendStatus.SUCCESSFULLY;
    }, error => {
      this.status = SendStatus.ERROR;
    });
  }
}
