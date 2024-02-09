import {combineReducers, configureStore} from '@reduxjs/toolkit';
import loginReducer from "../reducers/modalReducer.js";




const bigReducer = combineReducers({
    loginModalState:loginReducer,
})

 const store = configureStore({
    reducer: bigReducer,
});

export default store;