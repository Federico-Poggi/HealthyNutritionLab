import {Action} from "@reduxjs/toolkit";
import {SET_USER_LOGGED, SET_USER_NOT_LOGGED} from "../action";

interface User {
    logged: boolean
    role:string
}

const userState: User = {
    logged: false,
    role: "",
}
export default function userReducer(state: User = userState, action: Action) {
    switch (action.type) {
        case SET_USER_LOGGED:
            return {
                ...state,
                logged:true
            }
        case SET_USER_NOT_LOGGED:
            return {
                ...state,
                logged: false
            }

        default:
            return {
                ...state
            }
    }
}