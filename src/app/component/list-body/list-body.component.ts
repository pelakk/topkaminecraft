import {Component} from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

import {SearchInputService} from "../../services/search-input/search-input.service";

@Component({
  selector: 'app-list-body',
  templateUrl: './list-body.component.html',
  styleUrls: ['./list-body.component.scss'],
  providers: [SearchInputService]
})

export class ListBodyComponent {

  constructor() {}

}

