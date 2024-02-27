import { CgGym } from "react-icons/cg";
export function NoAssignedDoc() {
    return (
        <>
            <div
                className={`w-full bg-[#454A45] flex items-center justify-between bg-opacity-50 rounded-lg p-5 mt-5`}>
                <div className="h-[] w-1/3 flex justify-center">
                    <CgGym size={40}/>
                </div>
                <div className="flex items-center">
                    <p>Ancora nessun personal-trainer assegnato</p>
                </div>

            </div>
        </>
    );
}