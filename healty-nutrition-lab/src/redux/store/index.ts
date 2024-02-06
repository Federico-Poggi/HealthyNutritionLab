import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../reducers'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})


export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>