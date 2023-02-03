import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Home from "../pages/Home";
import Comerciales from "../pages/Comerciales";

// LAYOUTS

const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/comerciales" element={<Comerciales />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;