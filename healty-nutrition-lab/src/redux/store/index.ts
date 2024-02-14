import {combineReducers, configureStore} from '@reduxjs/toolkit';
import loginReducer from "../reducers/modalReducer.js";
import userReducer from "../reducers/userReducer.ts";
import alimentiDatasetReducer from "../reducers/alimentiDatasetReducer.ts";




const bigReducer = combineReducers({
    loginModalState:loginReducer,
    user:userReducer,
    alimentiDataSet:alimentiDatasetReducer
})

 const store = configureStore({
    reducer: bigReducer,
});

export default store;