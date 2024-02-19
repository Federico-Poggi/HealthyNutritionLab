import {Table, TableHead, TableHeadCell} from "flowbite-react";

export function TrainingPlan() {
    const URLTrainingPlan=``


    const getTrainingPlan=async ()=>{
        await fetch()
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
                    </Table>
                </div>
            </div>
        </>
    );
}