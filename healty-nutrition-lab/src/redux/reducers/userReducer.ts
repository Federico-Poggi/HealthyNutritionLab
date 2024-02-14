
import {GET_PATIENT, SET_USER_LOGGED, SET_USER_NOT_LOGGED} from "../action";

interface User {
    logged: boolean
    role:string
    patient:[]
}

const userState: User = {
    logged: false,
    role: "",
    patient:[]
}
interface LoggedUserAction {
    type: typeof SET_USER_LOGGED
    payload:string
}

interface NotLoggedAction {
    type: typeof SET_USER_NOT_LOGGED
    payload: ""
}
interface DocPatientAction{
    type: typeof GET_PATIENT
    payload:[]
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

        case GET_PATIENT:
            return{
                ...state,
                patient:action.payload
            }
        default:
            return {
                ...state
            }
    }
}