export const OPEN: string = "OPEN";
export const CLOSE: string = "CLOSE";
export const SET_USER_LOGGED: string = "LOGIN"
export const SET_USER_NOT_LOGGED: string = "USER_NOT_LOGGED"
export const SET_DATASET:string="DATASET"
export const GET_PATIENT:string="GET_PATIENT"
export const ALL_DATASET_ALIMENTS:string="ALL_DATASET_ALIMENTS"

interface PayloadAliments{
    content:[],
    totalPages:number
    totalElements:number
}


export const openAction = () => {
    return {
        type: OPEN,
    }
}
export const closeAction = () => {
    return {
        type: CLOSE,
    }
}
export const loggedUserAction = (role: string): { type: string, payload: string } => {
    return {
        type: SET_USER_LOGGED,
        payload: role
    }
}
export const notLoggedAction = (): { type: string } => {
    return {
        type: SET_USER_NOT_LOGGED
    }
}
export const setDataset= (data:object):{ type: string; payload:PayloadAliments }=>{
    return {
        type:SET_DATASET,
        payload: data
    }
}
export const getPatientAll=(data:[])=>{
    return {
        type:GET_PATIENT,
        payload:data
    }
}