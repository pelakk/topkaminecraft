import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromServerList from 'src/app/reducers/server-list.reducer';

export interface State {
  serverList: fromServerList.State
}

export const reducers: ActionReducerMap<State> = {
  serverList: fromServerList.serverListReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

