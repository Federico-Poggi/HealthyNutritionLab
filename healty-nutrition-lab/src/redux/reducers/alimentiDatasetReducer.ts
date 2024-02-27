import {SET_DATASET,ALL_DATASET_ALIMENTS} from "../action";
import {Alimento} from "../../interface/Interface.ts";

interface DataSet {
    content:Alimento[]
    totalPages:number
    totalElements:number
}

type SetDatasetAction ={
    type: typeof SET_DATASET
    payload: DataSet
}

const initState: DataSet = {
    content: [],
    totalPages: 0,
    totalElements: 0
}

 type AllDatasetAlimentsAction={
    type:typeof ALL_DATASET_ALIMENTS
    payload:[]
}

export const allDataActionAliments=(data:[])=>{
    return{
        type:ALL_DATASET_ALIMENTS,
        payload:data
    }
}

type DatasetAction=AllDatasetAlimentsAction|SetDatasetAction

export default function alimentiDatasetReducer(state: DataSet = initState, action: DatasetAction) {
    switch (action.type) {
        case SET_DATASET:
            return {
                    ...action.payload
                   /* content:action.payload.content,
                    totalPages:action.payload.totalPages,
                    totalElements:action.payload.totalElements*/
                }
        case ALL_DATASET_ALIMENTS:
           return {
               content:action.payload

           }


        default:
            return state
    }
}
