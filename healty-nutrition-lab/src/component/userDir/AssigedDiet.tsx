import {useEffect, useState} from "react";
import {Diet, DietList, DietSpec} from "../../interface/Interface.ts";
import {Label, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip} from "flowbite-react";
import {useDownload} from "../../interface/funzioni.ts";
import { TbFileDownload } from "react-icons/tb";

export function AssigedDiet() {
    const [dietList, setDietList] = useState<DietList>({dietList:[]})
    const [selected, setSelected] = useState<boolean>(false)
    const [dietFiltered,setDietFiltered]=useState<Diet>({
        actually: "",
        alimentiQuantita: undefined,
        dietId: 0,
        dietType: "",
        duration: "",
        expirationDate: "",
        issueDate: "",
        kcalTot: 0,
        pdfDiet: ''
    })
    const [thisDietId, setThisDietId] = useState<number>()
    const URLDiets = `http://localhost:5174/user/me/diets`
    const token = localStorage.getItem('token');
    const dowloadFile=useDownload()

    useEffect(() => {
        const fetchDiet =async ()=>{
            try {
                await getDietsList();
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
            setDietList(await response.json())
            console.log(dietList)
        }
    }
    const filterDiet = (idDiet: number) => {
        const diet = dietList.dietList.find((s) => s.dietId === idDiet)
        if (diet != undefined) {
            return (
                <>
                    <div className = {"flex justify-evenly pt-3"}>
                        <span className = {"flex items-center"}>
                            <Label className = {"text-white px-2"}>Tipo Dieta:</Label>
                            <h2 className = {"text-white"}>{diet.dietType}</h2>
                        </span>
                        <span className = {"flex items-center"}>
                            <Label className = {"text-white px-2"}>Data prescrizione: </Label>
                            <h3 className = {"text-white"}>{diet.issueDate}</h3>
                        </span>
                        <span className = {"flex items-center"}>
                            <Label className = {"text-white px-2"}>Data scadenza: </Label>
                            <h3 className = {"text-white"}>{diet.expirationDate}</h3>
                        </span>
                        <span className = {"flex items-center px-2"}>
                            <Label className = {"text-white px-2 py-2"}>Tot. Calorie:</Label>
                            <h3 className = {"text-white"}>{diet.kcalTot}</h3>
                        </span>

                    </div>
                    <div>
                        <h2 className = {"px-10 mt-10"}>Alimenti</h2>
                        <div className = {"text-white mt-10 overflow-y-auto"}>
                            {Object.entries(diet.alimentiQuantita).map(([alimento, quantita]: [string, number]) => (
                                <div className = {"text-white list-unstyled flex w-2/3 mx-auto py-1"} key = {alimento}>
                                <span className = {"flex-grow"}>
                                    {alimento}
                                </span>
                                    <span className = {"flex"}>
                                        {quantita}
                                        <p className = {"px-2"}>gr</p>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            );
        }
    }

    const findDiet=(idDieta:number)=>{
        const diet=dietList.dietList.find((s)=>s.dietId===idDieta)
        if(diet!=undefined){
            return diet
        }
    }

    return (
        <>
            <div className = {"flex justify-around flex-grow"}>
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
                {selected &&
                    <div className = {"max-w-[90%] max-h-[90vh] w-[40%] border my-4 "}>
                        <div className = {"p-3 border-b border-gray-700"}>
                            <h2 className = {"text-xl"}>Info Dieta</h2>
                        </div>
                        <div>
                            {filterDiet(thisDietId)}
                        </div>

                    </div>
                }

            </div>
        </>
    );
}