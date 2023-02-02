import "./index.css";
import HomeIcon from '@mui/icons-material/Home';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ResponsiveAppBar from '../Navbar';
import { Link } from "react-router-dom";

const Menu = () =>{
    return(
        <section>
            <ResponsiveAppBar></ResponsiveAppBar>
            <ul>
                <li><Link to="#home"><HomeIcon></HomeIcon><div class="nav">Inicio</div></Link></li>
                <li><Link to="#news"><HandshakeIcon></HandshakeIcon><div class="nav">Inter. Comer.</div></Link></li>
                <li><Link to="#contact"><Inventory2Icon></Inventory2Icon><div class="nav">Productos</div></Link></li>
                <li><Link to="#about"><AttachMoneyIcon></AttachMoneyIcon><div class="nav">Ventas</div></Link></li>
                <li><Link to="#about"><ReceiptIcon></ReceiptIcon><div class="nav">Compras</div></Link></li>
                <li><Link to="#about"><CategoryIcon></CategoryIcon><div class="nav">Producción</div></Link></li>
                <li><Link to="#about"><AutoStoriesIcon></AutoStoriesIcon><div class="nav">Tesorería</div></Link></li>
                <li><Link to="#about"><DragIndicatorIcon></DragIndicatorIcon><div class="nav">Mantenimiento</div></Link></li>
                <li><Link to="#about"><PrecisionManufacturingIcon></PrecisionManufacturingIcon><div class="nav">Servicios</div></Link></li>
            </ul>
        </section>
    )
}

export default Menu;