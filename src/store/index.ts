import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configReducer, IConfigState } from "./reducers/config";
import { favoriteReducer, IFavoriteState } from "./reducers/favorite";
import { movieApi } from "./reducers/movieApi";

export interface IAppState {
  config: IConfigState;
  favorite: IFavoriteState;
  [movieApi.reducerPath]: typeof movieApi;
}

export const persistConfig = {
  key: "root",
  whitelist: ["config", "favorite"],
  storage
};

export const rootReducer = combineReducers({
  config: configReducer,
  favorite: favoriteReducer,
  [movieApi.reducerPath]: movieApi.reducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    movieApi.middleware
  ]
});

export const persistor = persistStore(store);