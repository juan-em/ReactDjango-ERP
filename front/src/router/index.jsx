import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Home from "../pages/Home";
import Main from "../layout/main";
import Comerciales from "../pages/Comerciales";

// LAYOUTS

const Router = () =>{
    return(

        <BrowserRouter>
            <Routes>
                <Route element={<Main />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/comerciales" element={<Comerciales />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;