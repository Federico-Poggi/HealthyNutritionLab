
import {SET_USER_LOGGED, SET_USER_NOT_LOGGED} from "../action";

interface User {
    logged: boolean
    role:string
}

const userState: User = {
    logged: false,
    role: "",
}
interface LoggedUserAction {
    type: typeof SET_USER_LOGGED
    payload:string
}

interface NotLoggedAction {
    type: typeof SET_USER_NOT_LOGGED
    payload: ""
}

type UserAction = LoggedUserAction | NotLoggedAction;
export default function userReducer(state: User = userState, action: UserAction) {
    switch (action.type) {
        case SET_USER_LOGGED:
            return {
                ...state,
                logged:true,
                role:action.payload
            }
        case SET_USER_NOT_LOGGED:
            return {
                ...state,
                logged: false,
            }

        default:
            return {
                ...state
            }
    }
}