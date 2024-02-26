import {useEffect, useState} from "react";
import {DietaList} from "../../interface/Interface.ts";
import {Badge} from "flowbite-react";
import {useDownload} from "../../interface/funzioni.ts";

import {ModalDietSelected} from "./ModalDietSelected.tsx";
import {format, isAfter} from "date-fns";

export function AssigedDiet() {
    const [dietList, setDietList] = useState<DietaList>({dietList:[]})
    const [selected, setSelected] = useState<boolean>(false)
    const [thisDietId, setThisDietId] = useState<number>()
    const URLDiets = `http://localhost:5174/user/me/diets`
    const token = localStorage.getItem('token');
    const dowloadFile=useDownload()

    useEffect(() => {
        const fetchDiet =async ()=>{
            try {
              const diet= await getDietsList();
                setDietList(diet)
            }catch (e){
                console.log(e)
            }
        }
        fetchDiet()
    }, []);
    const getDietsList = async () => {
        const response = await fetch(URLDiets, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            throw new Error(await response.json())
        } else {
            const responseJ=await response.json()
            return responseJ;
        }
    }

    const filterDiet = (idDiet: number) => {
        const diet = dietList.dietList.find((s) => s.dietId === idDiet)
        if (diet != undefined) {
            return diet;
        }
    }
    const convertToDate=(dateArray:number[]):string=>{
        const year=dateArray[0];
        const month=dateArray[1]-1;
        const day=dateArray[2];
        const date:Date=new Date(year,month,day)
        return format(date,"dd-MM-yyyy")
    }

    const checkData = (expiredDate: number[]) => {
        const current = new Date();
        const date=new Date(expiredDate[0],expiredDate[1]-1,expiredDate[2])
        if (isAfter(date, current)) {
            return <Badge className={"justify-center bg-green-500 text-green-950"} color={"success"}>IN USE</Badge>
        } else {
            return <Badge className={"justify-center text-red-900 bg-red-400"}
                          color={"failure"}>EXPIRED</Badge>
        }
    }


    return (
        <>
        <div className="max-h-1/3 h-1/2 bg-[#413F42] w-full bg-opacity-35 rounded-xl p-2 overflow-y-auto">
            <h2 className="p-3 bg-[#545454] bg-opacity-[30%] rounded-xl">Le Tue Diete</h2>
            <table className="table table-auto w-full mt-5">
                <thead>
                <tr className="text-center">
                    <th>Tipo</th>
                    <th>Stato</th>
                    <th>Data Assegnazione</th>
                    <th>Data Scadenza</th>
                    <th>Kcal Totali</th>
                </tr>
                </thead>
                <tbody>
                {dietList.dietList.map((d) => (
                    <tr className="text-center hover:bg-[#545454] hover:bg-opacity-[8%] hover:text-[#17CF97] font-medium text-[90%] li cursor-pointer transition-all duration-100]"
                        key={d.dietId}
                        onClick={() => {
                            setSelected(!selected)
                            setThisDietId(d.dietId)
                        }}
                    >
                        <td>{d.dietType}</td>
                        <td>{checkData(d.expirationDate)}</td>
                        <td>{convertToDate(d.issueDate)}</td>
                        <td>{convertToDate(d.expirationDate)}</td>
                        <td>{d.kcalTot}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        {selected && <ModalDietSelected setIsOpen={setSelected}
                                        isOpened={selected}
                                        diet={filterDiet(thisDietId)}
        />}

</>
)
    ;
}