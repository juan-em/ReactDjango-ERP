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
import { Link } from "react-router-dom";


const MenuItem = (item) =>{
    return (
        <li><Link to={item.url}><item.icon></item.icon><div className="nav">{item.name}</div></Link></li>
    )
}


const menu_items = [
    {url:"/",icon:HomeIcon,name:"Inicio"},
    {url:"/comerciales",icon:HandshakeIcon,name:"Inter. Comer."},
    {url:"#contact",icon:Inventory2Icon,name:"Productos"},
    {url:"#about",icon:AttachMoneyIcon,name:"Ventas"},
    {url:"#about",icon:ReceiptIcon,name:"Compras"},
    {url:"#about",icon:CategoryIcon,name:"Producción"},
    {url:"#about",icon:AutoStoriesIcon,name:"Tesorería"},
    {url:"#about",icon:DragIndicatorIcon,name:"Mantenimiento"},
    {url:"#about",icon:PrecisionManufacturingIcon,name:"Servicios"},
];

const Menu = () =>{
    
    return(
        <section>
            <ul>
                <h1 className="logo">ALPACA</h1>
                {
                menu_items.map((item,i)=>(
                    <MenuItem  url={item.url} icon={item.icon} name={item.name}/>
                )) 
                }
            </ul>
        </section>
    )
}

export default Menu;
