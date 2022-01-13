import {createAction, props} from "@ngrx/store";
import {PagedResponse} from "../model/PagedResponse";
import {ListedServer} from "../model/ListedServer";

export const setPage = createAction(
  "[Server List] Set Page",
  props<{ page: number }>()
);

export const setRouteParams = createAction(
  "[Server List] Set Route Params",
  props<{ routeParams: {[key: string]: string} }>()
);

export const setServerList = createAction(
  "[Server List] Set Server List",
  props<{response: PagedResponse}>()
);

export const reset = createAction(
  "[Server List] Reset",
);

export const setPageSilent = createAction(
  "[Server List] Set Page Silently",
  props<{page: number}>()
);
