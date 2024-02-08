import {combineReducers, configureStore} from '@reduxjs/toolkit';
import loginReducer from "../reducers/modalReducer";

const bigReducer = combineReducers({
        loginModalState:loginReducer,
})

const store=configureStore({
    reducer:bigReducer
})
export default store;


/*export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>*/
