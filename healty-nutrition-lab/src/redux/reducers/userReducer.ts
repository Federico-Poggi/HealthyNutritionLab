import {Action} from "@reduxjs/toolkit";
import {SET_USER_LOGGED, SET_USER_NOT_LOGGED} from "../action";

interface User {
    logged: boolean
}

const userState: User = {
    logged: false,
}
export default function userReducer(state: User = userState, action: Action) {
    switch (action.type) {
        case SET_USER_LOGGED:
            return {
                logged:true
            }
        case SET_USER_NOT_LOGGED:
            return {
                logged: false
            }

        default:
            return {
                ...state
            }
    }
}