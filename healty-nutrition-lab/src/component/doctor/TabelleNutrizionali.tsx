import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {DefaultRootState, useDispatch, useSelector} from "react-redux";
import {setDataset} from "../../redux/action";
import {data} from "autoprefixer";
import {render} from "react-dom";
import store from "../../redux/store";

interface DataSet {
        content:[]
}


interface Alimento{
    idAlimento:number
    name:string
    parteEdibile:number
    kcal:number
    kj:number
    acqua:number
    totProt:number
    protAnimali:number
    protVeg:number
    glucidiTot:number
    lipidiTot:number
    lipidiSaturi:number
    lipidiMonoinsaturi:number
}

export function TabelleNutrizionali() {
    const state=useSelector((state: any)=>state.alimentiDataSet)
    const alimenti:Alimento[]=state.content

    const URLDataSet = "http://localhost:5174/doctor/nutritionist/aliments";
    useLocation().pathname
    const token = localStorage.getItem('token')
    const dispatch = useDispatch();
    useEffect(() => {
        const  fetchData =  async () => {
            try {
                const data:DataSet = await getDataSet();
                dispatch(setDataset(data.content));
                console.log(data)
            } catch (error) {
                console.error("Errore nella fetch:", error);
            }
        };
        fetchData();

    }, [])



    const getDataSet = async () => {
        const response = await fetch(URLDataSet, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Errore nella fetch");
        }
        const resp=await response.json()
        console.log(resp)
        return resp;

    }


    return (
        <>
            <div className = {"p-4 my-auto max-h-[80vh] max-w-[60vw] overflow-y-auto border mx-auto w-full"}>


                <table className = {"mx-auto w-[100%] mt-2  "}>
                    <thead className = {" "}>
                    <tr>
                        <th className = {"w-[100px]"}>Id</th>
                        <th className = {"w-[100px]"}> name</th>
                        <th className = {"w-[200px]"}>Kcal (100gr di parte edibile)</th>
                        <th className = {"w-[100px]"}>Proteine</th>
                        <th className = {"w-[100px]"}>Glucidi</th>
                        <th className = {"w-[100px]"}>Lipidi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        alimenti.map(al =>
                            <tr className = {"text-center text-white"} key = {al.idAlimento}>
                                <td className = {"py-6"}>{al.idAlimento}</td>
                                <td className = {"py-6"}>{al.name}</td>
                                <td className = {"py-6"}>{al.kcal}</td>
                                <td className = {"py-6"}>{al.totProt}</td>
                                <td className = {"py-6"}>{al.glucidiTot}</td>
                                <td className = {"py-6"}>{al.lipidiTot}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}