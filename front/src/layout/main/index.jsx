import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../components/Navbar";
import Menu from "../../components/Menu";

const Main = () =>{
    return(
        <section>
            <ResponsiveAppBar/>
            <Menu/>
            <Outlet/>
        </section>
    )
}

export default Main;


