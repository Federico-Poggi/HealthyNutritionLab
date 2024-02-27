import {OPEN, CLOSE} from "../action/index.js";
import {Action} from "@reduxjs/toolkit";

interface Open {
    isOpened: boolean
}


const initialState = {
    isOpened: false
} as Open
export default function loginReducer(state: Open = initialState, action: Action) {
    switch (action.type) {
        case OPEN:
            return {
                ...state,
                isOpened: true
            }
        case CLOSE:
            return {
                ...state,
                isOpened: false
            }
        default:
            return state;
    }
}