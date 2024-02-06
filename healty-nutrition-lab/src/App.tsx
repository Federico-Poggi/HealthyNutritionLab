import './App.css'
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {Route, Routes} from "react-router-dom";
import Layout from "./component/Layout.tsx";
import Home from "./component/Home.tsx";


function App() {
const counter=useSelector((state:RootState)=>state.counter.count)
console.log(counter+1)
    /*const dispatch= useDispatch();*/
/*const handleClick=()=>{
    dispatch({type:INCREMENT})
}*/
    return (
        <>
           <Routes>
               <Route path={"/"} element={<Layout/>}>
                <Route path={"/"} index element={<Home/>}/>
               </Route>
           </Routes>
        </>
    )
}

export default App
