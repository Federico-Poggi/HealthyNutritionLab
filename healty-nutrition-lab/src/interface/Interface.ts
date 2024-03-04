import React, {SetStateAction} from "react";
import {IconType} from "react-icons";

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
    setAlimentiDieta:Alimento[]
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
    issueDate: number[]
    expirationDate: number[]
    duration: string
    actually: string
    dietType: string
    alimentiQuantita:Record<string, number>
    pdfDiet: string
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
export interface DietaList{
    dietList:Diet[]
}

export interface DietModalProps{
    isOpened:boolean
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
    diet:Diet
}

export interface CardProps{
    heading:string,
    description:string,
    icon:IconType,
    className:string
}
export interface RespImg{
    imgUrl:string
}

export interface RootMe {
    idCliente: number
    name: string
    surname: string
    cellNumber: string
    email: string
    password: string
    birthday: any
    role: string
    urlImg: any
    diets: Diet[]
    trainingPlans: any[]
}
export interface MyDoc {
    nutriotionist: Doctor|null
    personalTrainer: Doctor|null
}
export interface Doctor {
    idDoctor: number
    name: string
    surname: string
    cellNumber: string
    email: string
    role: string
    urlImg: string
    customers: any[]
}

export interface RootArticle{
    content: Article[]
}
export interface Article{
    id:number
    title: string
    content: string
    urlImg: string
    authorsName: string[]
}
export interface ArticleProps{
    article:Article
}
export interface MeDoc {
    idDoctor: number
    name: string
    surname: string
    cellNumber: string
    email: string
    role: string
}

export interface MeUser{
    idCliente: number
    name: string
    surname: string
    cellNumber: string
    email: string
    password: string
    birthday: any
    role: string
    urlImg: string
}