import Collab from "./Collab.tsx";

function CollabSec() {
    return (
        <>
            <div id = {"collaboration"}
                 className = {"flex flex-col justify-center text-[#5E5E5E] desktop:text-[20px] items-center mt-10 max-w-[100vw] phone:hidden"}>
                <h3>Collaboration</h3>
                <div className = {"mt-10 w-7/12 flex flex-wrap justify-evenly"}>
                    <Collab/>
                    <Collab/>
                    <Collab/>
                    <Collab/>
                    <Collab/>
                    <Collab/>
                    <Collab/>
                    <Collab/>
                </div>
            </div>
        </>
    )
}

export default CollabSec