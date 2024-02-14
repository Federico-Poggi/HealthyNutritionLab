import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setDataset} from "../../redux/action";
interface DataSet {
        content:[]
    totalPages:number
    totalElements:number
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
    const dataset=useSelector((state: any)=>state.alimentiDataSet)
    const alimenti:Alimento[]=dataset.content
    const [pageNumber,setPageNumber]=useState<number>(0);
    const [totalPageNumber,setTotalPageNumber]=useState<number>(0)
    const index:number[]=[];
    const [pageNext, setPageNext]=useState(0)

    let page:number=pageNext;
    let size:number=20;
    let sortedBy:string="idAlimento";

    const URLDataSet = `http://localhost:5174/doctor/nutritionist/aliments?page=${page}&size=${size}&sortedBy=${sortedBy}`;
    useLocation().pathname
    const token = localStorage.getItem('token')
    const dispatch = useDispatch();
    useEffect(() => {
        const  fetchData =  async () => {
            try {
                const data:DataSet = await getDataSet();
                dispatch(setDataset(data.content));
                setPageNumber(()=>data.totalPages)
                setTotalPageNumber(()=>data.totalElements)
                console.log(data)
            } catch (error) {
                console.error("Errore nella fetch:", error);
            }
        };
        fetchData();

    }, [page])

    for(let i=0; i<=pageNumber; i++){
        index.push(i);
    }

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
            <h1>Alimenti</h1>
            <div className = {"w-full my-auto"}>
                <div className = {"p-4 max-h-[80vh] max-w-[60vw] overflow-y-auto border mx-auto w-full"}>


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
                <div className = {"flex  max-w-[60vw] h-[50px] mx-auto"}>
                    {
                        index.map((num) => (
                            <p onClick={()=>(setPageNext(num))} className = {"w-[50px] justify-center hover:bg-amber-300 cursor-pointer text-white flex items-center text-[20px]"} key = {num}>
                                {num +1}
                            </p>
                        ))
                    }
                </div>
            </div>
        </>
    );
}