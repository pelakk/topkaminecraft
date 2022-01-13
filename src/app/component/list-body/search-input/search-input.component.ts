import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckBox} from 'src/app/model/CheckBox';
import {DataService} from 'src/app/services/data.service';
import {SearchInputService} from "../../../services/search-input/search-input.service";
import * as ServerListActions from "../../../reducers/server-list.actions";
import * as fromServerListAction from "../../../reducers/server-list.actions";
import * as fromApp from "../../../reducers/index";
import {Store} from '@ngrx/store';
import {from} from "rxjs";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  to: string = '';
  checkBoxesVersions: CheckBox[] = [];
  checkBoxesModes: CheckBox[] = [];
  versions = ['MC_1_8', 'MC_1_9', 'MC_1_10', 'MC_1_11', 'MC_1_12', 'MC_1_13', 'MC_1_14', 'MC_1_15', 'MC_1_16', 'MC_1_17', 'MC_1_18'];
  modes = ['Survival', 'SkyBlock', 'PvP', 'Vanilla', 'BedWars', 'Creative', 'SkyWars', 'Hardcore', 'Gildie', 'FreeBuild', 'Parkour', 'Minigames']

  public isCollapsed = true;

  constructor(private dataService: DataService, private searchInput: SearchInputService, public router: Router,
              private store: Store<fromApp.State>, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.versions.forEach(v => this.checkBoxesVersions.push(new CheckBox(v)));
    this.modes.forEach(m => this.checkBoxesModes.push(new CheckBox(m)));
  }

  send(value: string) {
    this.searchInput.setPhrase(value);

    if (value !== '') {
      this.store.dispatch(ServerListActions.setPageSilent({page: 1}));
      this.store.dispatch(ServerListActions.setRouteParams({routeParams: {search: value}}));
    } else {

      this.store.dispatch(fromServerListAction.setPage({page: 1}));
      if (this.route.snapshot.firstChild) {
        if (this.route.snapshot.firstChild.params['page'] !== undefined) {
            this.store.dispatch(fromServerListAction.setPageSilent({page: 1}));
            this.store.dispatch(fromServerListAction.setRouteParams({routeParams: {}}));
            this.router.navigate(['page', 1]);
            return;
        }

        this.store.dispatch(fromServerListAction.setPageSilent({page: 1}));
        this.store.dispatch(fromServerListAction.setRouteParams({routeParams: {...this.route.snapshot.firstChild.params, ...this.route.snapshot.firstChild.queryParams}}));

      }
    }

  }

  public formatVersion(version: string) {
    return version.slice(3, version.length).split("_").join(".");
  }

  public search1() {
    let paramVersionsString: string = "";
    let paramCategoriesString: string = "";
    this.checkBoxesVersions.filter(v => v.isChecked).forEach(v => paramVersionsString = paramVersionsString + v.name + ",");
    this.checkBoxesModes.filter(v => v.isChecked).forEach(v => paramCategoriesString = paramCategoriesString + v.name + ",");
    paramCategoriesString = paramCategoriesString.slice(0, paramCategoriesString.length - 1);
    paramVersionsString = paramVersionsString.slice(0, paramVersionsString.length - 1);

    if (paramVersionsString.length != 0 && paramCategoriesString.length != 0)
      this.router.navigate(['search'], {
        queryParams: {
          versions: paramVersionsString,
          categories: paramCategoriesString
        }, skipLocationChange: true
      })
    else if (paramCategoriesString.length != 0)
      this.router.navigate(['search'], {queryParams: {categories: paramCategoriesString}, skipLocationChange: true})
    else if (paramVersionsString.length != 0)
      this.router.navigate(['search'], {queryParams: {versions: paramVersionsString}, skipLocationChange: true})
  }

  public changeSelection(checkbox: CheckBox) {
    checkbox.setChecked = !checkbox.isChecked;
  }
}
