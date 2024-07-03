import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({ userReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  //reducer: userReducer, // without persist reducer
  reducer: persistedReducer, //userReducer----> persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);
