import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Home from "../pages/Home";
import Main from "../layout/main";

// LAYOUTS

const Router = () =>{
    return(

        <BrowserRouter>
            <Routes>
                <Route element={<Main />}>
                    <Route path="/" element={<Home />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;