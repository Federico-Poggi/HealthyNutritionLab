
import {SET_DATASET} from "../action";

interface DataSet{
content:[]
}



interface SetDataset {
    type: typeof SET_DATASET
    payload:DataSet
}

const initState:DataSet={
       content:[]
}
export default function alimentiDatasetReducer(state:DataSet = initState, action:SetDataset){
    switch (action.type){
        case SET_DATASET:
            return{
                ...state.content,
                    content: action.payload
            }

        default:
            return {
                ...state,
                }
            }
    }
