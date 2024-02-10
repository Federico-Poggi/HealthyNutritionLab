
export const OPEN:string="OPEN";
export const CLOSE:string="CLOSE";
export const SET_USER_LOGGED:string= "LOGIN"
export const SET_USER_NOT_LOGGED:string= "USER_NOT_LOGGED"



export const openAction=()=>{
    return{
        type:OPEN,
    }
}
export const closeAction=()=>{
    return{
        type:CLOSE,
    }
}
export const loggedUserAction=():{type:string}=>{
    return{
        type:SET_USER_LOGGED
    }
}
export const notLoggedAction=():{type:string}=>{
    return {
        type:SET_USER_NOT_LOGGED
    }
}