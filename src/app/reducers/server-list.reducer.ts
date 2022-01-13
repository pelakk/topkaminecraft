import {createReducer, on} from "@ngrx/store";
import {reset, setPage, setPageSilent, setRouteParams, setServerList} from "./server-list.actions";
import {PagedResponse} from "../model/PagedResponse";


export interface State {
  routeParams: { [key: string]: string };
  page: number;
  pagedResponse: PagedResponse;
  isLoading: boolean;
}


export const initialState: State = {
  routeParams: {},
  page: 1,
  pagedResponse: {servers: [], totalServers: 0},
  isLoading: true
}

export const serverListReducer = createReducer(
  initialState,
  on(setPage, (state, {page}) => ({...state, page: page, isLoading: true})),
  on(setRouteParams, (state, {routeParams}) => ({...state, routeParams: routeParams, isLoading: true})),
  on(setServerList, (state, {response}) => {
    return {
      ...state,
      pagedResponse: response,
      isLoading: false
    }
  }),
  on(reset, state => {
    return {
      ...state,
      page: 1,
      routeParams: {},
      isLoading: true
    }
  }),
  on(setPageSilent, (state, {page}) => {
    return {
      ...state,
      page: page
    }
  })
);
