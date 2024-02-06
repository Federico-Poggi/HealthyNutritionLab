
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {INCREMENT} from "./redux/action";
import {Route, Routes} from "react-router-dom";
import Layout from "./component/Layout.tsx";


function App() {
const counter=useSelector((state:RootState)=>state.counter.count)
console.log(counter+1)
    const dispatch= useDispatch();
/*const handleClick=()=>{
    dispatch({type:INCREMENT})
}*/
    return (
        <>
           <Routes>
               <Route path={"/"} element={<Layout/>}>

               </Route>
           </Routes>
        </>
    )
}

export default App
