import {OPEN, CLOSE} from "../action";
import {Action} from "@reduxjs/toolkit";

interface LoginModal {
    isOpen: boolean
}

const initialState:LoginModal = {
    isOpen: false
} as LoginModal
export default function loginReducer(state:LoginModal = initialState, action: Action):LoginModal {
    switch (action.type) {
        case OPEN:
            return {
                ...state,
                isOpen: true
            }
        case CLOSE:
            return {
                ...state,
                isOpen: false
            }
        default:
            return state;
    }
}