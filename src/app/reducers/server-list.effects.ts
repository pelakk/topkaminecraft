import {Injectable} from "@angular/core";
import {act, Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {debounceTime, map, switchMap} from "rxjs/operators";
import {DataService} from "../services/data.service";
import {HttpParams} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {State} from "./index"
import * as ServerListActions from './server-list.actions'
import {PagedResponse} from "../model/PagedResponse";

@Injectable()
export class ServerListEffects {

  loadServers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServerListActions.setRouteParams, ServerListActions.reset, ServerListActions.setPage),
      concatLatestFrom(() => this.store.select('serverList')),
      switchMap(action => {
        return this.dataService.getBasicServerInfo(new HttpParams().appendAll({page: action[1].page - 1, ...action[1].routeParams})).pipe(
          map((serverList: PagedResponse) => {
            return ServerListActions.setServerList({
              response: serverList
            })
          }))
      })));

  constructor(private actions$: Actions,
              private dataService: DataService,
              private store: Store<State>) {}
}
