import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { surveyReducer } from "./features/surverys/surveySlice";
import thunk from 'redux-thunk';

const rootPersistConfig = {
    key: 'root',
    storage: storageSession,
    stateReconciler: hardSet,
}

const rootReducer = combineReducers({
    survey: surveyReducer,
})
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export const store = configureStore({
    reducer:persistedReducer,
    middleware: [thunk]

})

export const persistor = persistStore(store);