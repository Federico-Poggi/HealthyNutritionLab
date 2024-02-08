import SectionHomeService from "./SectionHomeService.tsx";
import {SectionTrainingHome} from "./SectionTrainingHome.tsx";

function Service() {
    return (
        <>
            <div className = {"max-w-[100vw] flex flex-col"}>
                <SectionHomeService/>
                <SectionTrainingHome/>
            </div>
        </>
    )
}

export default Service