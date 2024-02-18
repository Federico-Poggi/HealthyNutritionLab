import {SetStateAction} from "react";

export interface Pazienti{
    content:[]
}
export interface DocPatient{
    idCliente:number
    name:string
    surname:string
    cellNumber:string
    email:string
    diets:[]
    trainingPlans:[]
}

export type CheckState=DocPatient[]|undefined
export interface ModalDietProps{
    isOpenProps: boolean
    onClose: () => void
    alimentiDietaSelected:Alimento[]
    setAlimentiDieta:SetStateAction<Alimento[]>
}
export interface Alimento {
    idAlimento: number
    name: string
    parteEdibile: number
    kcal: number
    kj: number
    acqua: number
    totProt: number
    protAnimali: number
    protVeg: number
    glucidiTot: number
    lipidiTot: number
    lipidiSaturi: number
    lipidiMonoinsaturi: number

}
export interface DataSet {
    content: Alimento[]
    totalPages: number
    totalElements: number
}
export interface StateLog {
    user: {
        logged: boolean
        role: string
    }
}
export interface Diet {
    dietId: number
    kcalTot: number
    issueDate: string
    expirationDate: string
    duration: string
    actually: string
    dietType: string
    alimentiQuantita:Record<string, number>
    pdfDiet: File
}
export interface AssignDiet {
    duration: string
    dietType: string
    alimentoAndQuantita: DietSpec[]
}
export interface DietSpec{
    idAlimento:null|number
    quantita:number
}
export interface Paziente {
    idCliente: number|null
    name: string
    surname: string
    cellNumber: string
    email: string
    diets: []
    trainingPlans: []
}
export interface DietList{
    dietList:Diet[];
}

