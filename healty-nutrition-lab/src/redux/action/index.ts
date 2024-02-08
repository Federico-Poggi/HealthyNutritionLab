
export const OPEN:string="OPEN";
export const CLOSE:string="CLOSE";


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

