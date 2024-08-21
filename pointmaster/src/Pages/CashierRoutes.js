import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import User from "./User/User";


function CashierRoutes() {
  return ( 
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Users" element={<User/>}/>   
    </Routes>
  );
}


export default CashierRoutes;