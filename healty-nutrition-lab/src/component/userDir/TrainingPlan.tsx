import {Table, TableHead, TableHeadCell} from "flowbite-react";

export function TrainingPlan() {
    const URLTrainingPlan=``


    const getTrainingPlan=async ()=>{
        await fetch()
    }

    return (
        <>
            <div className="max-h-[50%] h-1/2 bg-[#413F42] w-full bg-opacity-35 rounded-xl p-2 overflow-y-auto">
                <h2 className="p-3 bg-[#545454] bg-opacity-[30%] rounded-xl">Schede Allenamento</h2>
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
                  {/*  {dietList.dietList.map((d) => (
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
                    ))}*/}
                    </tbody>
                </table>
            </div>
            </>
            );
            }