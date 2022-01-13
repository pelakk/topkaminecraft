import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListedServer} from "../../../model/ListedServer";
import {DataService} from "../../../services/data.service";
import {SearchInputService} from "../../../services/search-input/search-input.service";
import {combineLatest, Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SeoService} from "../../../services/seo/seo.service";
import {Store} from "@ngrx/store";
import * as fromApp from '../../../reducers/index';
import * as fromServerListAction from '../../../reducers/server-list.actions';
import * as fromServerListSelector from '../../../reducers/server-list.selectors';
import {tap} from "rxjs/operators";

const DESCRIPTION_CATEGORY = 'Tutaj znajdziesz listę wiodących serwerów minecraft z trybem survival, skyblock, minez, bedwars, gildie, creative';
const DESCRIPTION_VERSION = 'Tutaj znajdziesz listę wiodących serwerów minecraft na wersje 1.8, 1.8.9, 1.16, 1.16.4, 1.17, 1.18, 1.18.1';
const DESCRIPTION_BASE = "Innowacyjna lista serwerów Minecraft, stworzona by zebrać wszystkie najlepsze serwery! Survival, pvp, skyblock, bedwars, gildie, działki, skywars, parkour";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {

  serverList$!: Observable<ListedServer[]>
  page: number = 1;
  pageSub?: Subscription;
  totalServers$!: Observable<number>;
  currentRouteParams: { [key: string]: string } = {};
  isLoading$!: Observable<boolean>;
  numberOfPremium: number = 0;


  constructor(private dataService: DataService, private searchInput: SearchInputService,
              private route: ActivatedRoute, private seoService: SeoService,
              private store: Store<fromApp.State>,
              private router: Router) {
  }

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams])
      .subscribe(params => {
        if (params[0]['page'] !== undefined) {
          this.store.dispatch(fromServerListAction.setPage({page: +params[0]['page']}));
          this.currentRouteParams = {};
        } else {
          this.currentRouteParams = {...params[0], ...params[1]};
          this.store.dispatch(fromServerListAction.setPageSilent({page: 1}));
          this.store.dispatch(fromServerListAction.setRouteParams({routeParams: this.currentRouteParams}));
        }

        this.seo();
      });


    this.isLoading$ = this.store.select(fromServerListSelector.isLoading);
    this.pageSub = this.store.select(fromServerListSelector.currentPage).subscribe(page => {
      this.page = page
    });
    this.totalServers$ = this.store.select(fromServerListSelector.totalServers);
    this.serverList$ = this.store.select(fromServerListSelector.serverList).pipe(
      tap(list => {
        this.numberOfPremium = 0;
        this.numberOfPremium = list.filter(server => server.premiumTimeExpire > 0).length;
        this.numberOfPremium = this.numberOfPremium ? this.numberOfPremium : -1;
      })
    );


  }


  public pageChangedEvent(event: number) {
    this.page = event;
    if (Object.keys(this.currentRouteParams).length === 0) {
      this.router.navigate(["page", event]);
    } else {
      this.store.dispatch(fromServerListAction.setPage({page: event}));
    }
  }


  public seo() {
    this.seoService.updateTitle(`TopkaMinecraft - Najlepsze serwery Minecraft!`);
    this.seoService.updateDescription(DESCRIPTION_BASE);

    if (this.currentRouteParams.versions) {
      const versions = this.currentRouteParams.versions.split(',')
        .map(version => version.split('_').join('.').slice(3)).join(', ');

      this.seoService.updateTitle(`Najlepsze serwery minecraft z wersją ${versions}`);
      this.seoService.updateDescription(`Tutaj znajdziesz listę wiodących serwerów minecraft na wersje ${versions}`);
    }

    if (this.currentRouteParams.categories) {
      const categories = this.currentRouteParams.categories.split(',').join(', ');

      this.seoService.updateTitle(`Najlepsze serwery minecraft z trybem ${categories}`);
      this.seoService.updateDescription(`Tutaj znajdziesz listę wiodących serwerów minecraft z trybem ${categories}`);
    }
  }

  ngOnDestroy(): void {
    if (this.pageSub)
      this.pageSub.unsubscribe();
  }
}
