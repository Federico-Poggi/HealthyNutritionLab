import {combineReducers, configureStore, Store} from '@reduxjs/toolkit';
import loginReducer from "../reducers/modalReducer.js";
import userReducer from "../reducers/userReducer.ts";
import alimentiDatasetReducer from "../reducers/alimentiDatasetReducer.ts";


export type RootStore=ReturnType<typeof bigReducer>


const bigReducer = combineReducers({
    loginModalState:loginReducer,
    user:userReducer,
    alimentiDataSet:alimentiDatasetReducer
})

export type AppStore = Store<RootStore>;

 const store = configureStore({
    reducer: bigReducer,
});

export default store;

