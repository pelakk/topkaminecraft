import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { DataService } from '../../services/data.service';
import {LoaderService} from "../../services/loader/loader.service";
import {Router} from "@angular/router";
import { Store } from '@ngrx/store';
import {State} from "../../reducers/index"
import * as fromServerListAction from "../../reducers/server-list.actions"
import {PagedResponse} from "../../model/PagedResponse";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed=true;

  closeModal!: string;

  addServerStatus!: boolean;

  constructor(private modalService: NgbModal, private dataService: DataService, private router: Router, private store: Store<State>) { }

  ngOnInit(): void {
  }

  triggerRecommendModal(content: any) {
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
      return  `with: ${reason}`;
    }
  }

  reloadComponent() {
    this.store.dispatch(fromServerListAction.reset());
  }

  addServer(ip: string, port: string){
    this.dataService.createServer(ip, +port).subscribe(response => {
      this.addServerStatus = true;
      setTimeout(()=>{
        this.dataService.getBasicServerInfo({page: 0, search: ip}).subscribe((response: PagedResponse) => {
          this.router.navigate(['server', response.servers[0].id]);
        });
        this.modalService.dismissAll();
      },3000);
    }, err => {
      this.addServerStatus = false;
    });
  }

  isLoading(){
    return LoaderService.isLoading.value;
  }

  getLoader(){
    return LoaderService;
  }

}
