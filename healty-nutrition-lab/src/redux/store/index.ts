import {combineReducers, configureStore} from '@reduxjs/toolkit';
import loginReducer from "../reducers/modalReducer.js";
import userReducer from "../reducers/userReducer.ts";




const bigReducer = combineReducers({
    loginModalState:loginReducer,
    user:userReducer,
})

 const store = configureStore({
    reducer: bigReducer,
});

export default store;