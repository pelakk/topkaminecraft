import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as ServerListReducer from "./server-list.reducer";


export const ServerListSelectors = createFeatureSelector<ServerListReducer.State>("serverList");

export const serverList = createSelector(
  ServerListSelectors,
  state => state.pagedResponse.servers
);

export const currentPage = createSelector(
  ServerListSelectors,
  state => state.page
);

export const totalServers = createSelector(
  ServerListSelectors,
  state => state.pagedResponse.totalServers
);

export const isLoading = createSelector(
  ServerListSelectors,
  state => state.isLoading
);

export const currentRouteParams = createSelector(
  ServerListSelectors,
  state => state.routeParams
);

export const pagedResponse = createSelector(
  ServerListSelectors,
  state => state.pagedResponse
);
