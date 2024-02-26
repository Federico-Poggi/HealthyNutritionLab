import {useEffect, useState} from "react";
import {DietaList} from "../../interface/Interface.ts";
import {Badge, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip} from "flowbite-react";
import {useDownload} from "../../interface/funzioni.ts";
import { TbFileDownload } from "react-icons/tb";
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

        {/*<div className={"flex justify-around flex-grow max-h-[100%]"}>
                <div className={"max-h-[70vh] rounded-2xl  overflow-y-auto p-0 border border-gray-700 mt-5"}>
                    <Table hoverable
                           className={"relative border-gray-700 "}
                    >
                        <TableHead className={"sticky top-0"}>
                            <TableHeadCell className={"bg-gray-800 text-gray-400"}>TIPO DIETA</TableHeadCell>
                            <TableHeadCell className={"bg-gray-800 text-gray-400"}>STATO DIETA</TableHeadCell>
                            <TableHeadCell className={"bg-gray-800 text-gray-400"}>DATA
                                                                                   ASSEGNAZIONE</TableHeadCell>
                            <TableHeadCell className={"bg-gray-800 text-gray-400"}>DATA
                                                                                   SCADENZA</TableHeadCell>
                            <TableHeadCell className={"bg-gray-800 text-gray-400"}>KCAL TOTALI</TableHeadCell>
                            <TableHeadCell className={"bg-gray-800 text-gray-400"}>DOWNLOAD</TableHeadCell>
                        </TableHead>
                        <TableBody className={"divide-y p-0"}>
                            {dietList.dietList.map(d => {
                                return <TableRow
                                    onClick={() => {
                                        setSelected(!selected)
                                        setThisDietId(d.dietId)
                                    }}
                                    className={"cursor-pointer"}
                                    key={d.dietId}
                                >
                                    <TableCell>{d.dietType}</TableCell>
                                    <TableCell>
                                        {(d.actually)}
                                    </TableCell>
                                    <TableCell>{d.issueDate}</TableCell>
                                    <TableCell>{d.expirationDate}</TableCell>
                                    <TableCell>{d.kcalTot}</TableCell>
                                    <TableCell>
                                        <Tooltip content={"Scarica dieta"}>
                                            <TbFileDownload size={25}
                                                            className={"cursor-pointer"}
                                                            onClick={() => dowloadFile(d.pdfDiet)}
                                            />
                                            <a href={d.pdfDiet} download="pdf.pdf">Download</a>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            })
                            }
                        </TableBody>
                    </Table>
                </div>*/}
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