import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../components/Navbar";
import Menu from "../../components/Menu";

const Main = () =>{
    return(
        <div>
            <ResponsiveAppBar/>
            <Menu/>
            <Outlet/>
        </div>
    )
}

export default Main;


