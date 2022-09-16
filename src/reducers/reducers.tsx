import * as redux from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';

import filtersReducer from './filtersreducer';

const favouritesReducer = (state: any[] = [], action: any) => {
  const index = state.findIndex(state => state.id === action.payload?.id);
  
  if (action.type === "ADD_FAV_ITEM" && index < 0) {
    return state.concat(action.payload);
  }

  if (action.type === "REMOVE_FAV_ITEM" && index >= 0) {
    let newState = [...state];
    newState.splice(index, 1);
    return newState;
  }
  return state;
}

export const rootReducer = redux.combineReducers({
  filters: filtersReducer,
  favourites: favouritesReducer,
});

export type AppThunkDispatch = ThunkDispatch<RootState, void, Action>;
export type RootState = ReturnType<typeof rootReducer>;
