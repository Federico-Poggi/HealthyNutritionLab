import logo from "../assets/LogoIpsum.svg";
function Collab(){
    return(

        <div className={"flex items-center  px-10 phone:hidden"}>
            <img id={"logoipsum"} src={logo} className={"m-0 desktop:w-[150px] phone:w-[20px] tablet:w-[100px] opacity-50 mb-5"}/>
        </div>

    )
}
export default Collab