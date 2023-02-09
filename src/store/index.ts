import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { configReducer, IConfigState } from "./reducers/config";
import { movieApi } from "./reducers/movieApi";

export interface IAppState {
  config: IConfigState;
}

export const rootReducer = combineReducers({
  config: configReducer,
  [movieApi.reducerPath]: movieApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    movieApi.middleware
  ]
});