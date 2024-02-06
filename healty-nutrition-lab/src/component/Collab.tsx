import logo from "../assets/logosmall.png";
function Collab(){
    return(

        <div className={"flex items-center  px-10 max-w-[100vw] phone:hidden"}>
            <img src={logo} className={"m-0 desktop:w-[40px] phone:w-[20px] tablet:w-[30px] opacity-50"}/>
            <p className={"text-[#424242] phone:text-[15px] desktop:text-[25px] tablet:text-[15px]"}>Logoipsum</p>
        </div>

    )
}
export default Collab