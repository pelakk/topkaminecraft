import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {CompleteServer} from "../../model/CompleteServer";
import {DataService} from "../../services/data.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {LoaderService} from 'src/app/services/loader/loader.service';
import {Vote} from "../../model/Vote";
import {Payment} from "../../model/Payment";
import * as $ from 'jquery';
import {SeoService} from "../../services/seo/seo.service";
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})

export class ServerComponent implements OnInit {

  completeServer!: CompleteServer;
  recaptcha!: FormGroup;
  siteKey: string = "6LdrDDgdAAAAANHQD0xKfzCkyi5NBtb-EkMgGNWg";
  closeModal!: string;
  closeResult!: string;
  vote!: Vote;
  price: number = 0;
  showPrice: number = 7;
  isMobile: boolean = false;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router
    , private modalService: NgbModal, private formBuilder: FormBuilder, private seoService: SeoService) {
  }

  get recordsLength() {
    return Object.keys(this.completeServer.onlineHistory).length;
  }

  get usefulUrls() {
    return (this.completeServer.usefulUrl as unknown as FormArray);
  }

  get usefulUrlsLength() {
    return Object.keys(this.usefulUrls).length;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.completeServer = data['completeServer'];
    });

    this.recaptcha = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });

    this.seoService.updateTitle(this.completeServer.name + " | TopkaMinecraft - Najlepsze serwery Minecraft!");

    if (this.completeServer.categories.length === 0) {
      this.seoService.updateDescription("Serwer minecraft " + this.completeServer.name)
    } else {
      this.seoService.updateDescription("Serwer minecraft " + this.completeServer.name + ": Tryby gry na serwerze: " + this.completeServer.categories);
    }


    this.seoService.updateKeywords(this.completeServer.name + " lista najlepsze serwery minecraft");

    window.scroll(0, 0);

    if(window.matchMedia("only screen and (max-width: 575px)").matches) this.isMobile = true;
  }

  public recommend(id: number, name: string, captcha: any, event: Event) {
    if (name.indexOf(' ') < 0) {
      event.preventDefault();
      this.dataService.recommendServer(id, name, captcha).subscribe(response => {
        this.vote = Vote.SUCCESS;
      }, error => {
        if (error.error.response == "Already voted!")
          this.vote = Vote.ALREADY_VOTED;
        else this.vote = Vote.UNTRUSTED;
      })
      setTimeout(() => {
        location.reload();
      }, 2500);
    } else this.vote = Vote.ERROR;
  }

  public triggerRecommendModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public formatDate(time: number) {
    let date = new Date(+time);
    let month: number = +date.getMonth() + 1;
    return date.getDate() + '-' + month + '-' + date.getFullYear() + ' / ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }

  isLoading() {
    return LoaderService.isLoading.value;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  togglePayment(days: number | string) {
    if (days < 7 || days > 7000) {
      return;
    }
    $('.content').slideToggle(300);
    $('.form').delay(300).slideToggle('slow');
    this.price = +days * 1.5;
    this.showPrice = +days;
  }

  togglePscPayment() {
    this.showPrice = 7;
    $('.payment-mtd').slideToggle(300);
    $('.content-psc').delay(300).slideToggle('slow');
  }

  toggleOnlinePayment() {
    this.showPrice = 7;
    $('.payment-mtd').slideToggle(300);
    $('.content').delay(300).slideToggle('slow');
  }

  public createAndRedirectToPayment(email: string, personal_data: string, id: number, formPayment: NgForm) {
    if (!formPayment.valid) {
      return;
    }

    let payment = new Payment(this.price, email, personal_data, id);
    window.location.href = payment.buildUrl();
  }

  isEmpty(): boolean {
    return Object.keys(this.completeServer.usefulUrl).length == 0;

  }


}
