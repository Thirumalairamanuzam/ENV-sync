import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer, persistStore} from 'redux-persist' //the user: state will be gone, when the page is refreshed. To avoid that we need redux-persist
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    user: userReducer,
}) //combines all reducers

const persistConfig={
    key: 'root',
    storage,
    version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
   reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck: false,
    }), //to not get an error for not serializing variables

})

export const persistor = persistStore(store);