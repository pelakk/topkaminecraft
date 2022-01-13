import { Component, Input, OnInit } from '@angular/core';
import { ListedServer } from 'src/app/model/ListedServer';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-server-block',
  templateUrl: './server-block.component.html',
  styleUrls: ['./server-block.component.scss']
})
export class ServerBlockComponent implements OnInit {

  @Input() server!: ListedServer;

  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  isLoading(){
    return LoaderService.isLoading.value;
  }

  getLoader(){
    return LoaderService;
  }

  lastFullHour(){
    let date = new Date();
    return date.getHours();
  }

}
