import {useEffect, useState} from "react";
import {DietaList} from "../../interface/Interface.ts";
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip} from "flowbite-react";
import {useDownload} from "../../interface/funzioni.ts";
import { TbFileDownload } from "react-icons/tb";
import {ModalDietSelected} from "./ModalDietSelected.tsx";

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



    return (
        <>
            <div className = {"flex justify-around flex-grow h-1/2"}>
                <div className = {"max-h-[70vh] rounded-2xl  overflow-y-auto p-0 border border-gray-700 mt-5"}>
                    <Table hoverable className = {"relative border-gray-700 "}>
                        <TableHead className = {"sticky top-0"}>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>TIPO DIETA</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>STATO DIETA</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>DATA
                                                                                     ASSEGNAZIONE</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>DATA
                                                                                     SCADENZA</TableHeadCell>
                            <TableHeadCell className = {"bg-gray-800 text-gray-400"}>KCAL TOTALI</TableHeadCell>
                            <TableHeadCell  className = {"bg-gray-800 text-gray-400"}>DOWNLOAD</TableHeadCell>
                        </TableHead>
                        <TableBody className = {"divide-y p-0"}>
                            {dietList.dietList.map(d => {
                                return <TableRow
                                    onClick = {() => {
                                        setSelected(!selected)
                                        setThisDietId(d.dietId)
                                    }}
                                    className={"cursor-pointer"}
                                    key = {d.dietId}>
                                    <TableCell>{d.dietType}</TableCell>
                                    <TableCell>
                                        {(d.actually)}
                                    </TableCell>
                                    <TableCell>{d.issueDate}</TableCell>
                                    <TableCell>{d.expirationDate}</TableCell>
                                    <TableCell>{d.kcalTot}</TableCell>
                                    <TableCell>
                                        <Tooltip content={"Scarica dieta"}>
                                            <TbFileDownload size={25} className={"cursor-pointer"} onClick={()=>dowloadFile(d.pdfDiet)}/>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            })
                            }
                        </TableBody>
                    </Table>
                </div>
                {selected && <ModalDietSelected setIsOpen={setSelected} isOpened={selected} diet={filterDiet(thisDietId)}/>}
            </div>
        </>
    );
}