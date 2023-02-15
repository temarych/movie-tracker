import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configReducer, IConfigState } from "./reducers/config";
import { movieApi } from "./reducers/movieApi";

export interface IAppState {
  config: IConfigState;
}

export const persistConfig = {
  key: "root",
  whitelist: ["config"],
  storage
};

export const rootReducer = combineReducers({
  config: configReducer,
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