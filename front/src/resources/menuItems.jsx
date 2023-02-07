import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SearchIcon from '@mui/icons-material/Search';

export const menuItems = [
    { url: "/", icon: <HomeIcon/>, name: "Inicio",
    item:[] },

    { url: "#comerciales", icon: <HandshakeIcon/>, name: "Inter. Comer.",
    item:[{name:'Cliente',icon: <HomeIcon/>,url:'#cliente'},
        {name:'Proveedor',icon: <HomeIcon/>,url:'#proveedor'}] },

    { url: "#contact", icon: <Inventory2Icon/>, name: "Productos",
    item:[{name:'Cliente',icon: <HomeIcon/>,url:'#cliente'},
        {name:'Proveedor',icon: <HomeIcon/>,url:'#proveedor'}] },

    { url: "#about", icon: <AttachMoneyIcon/>, name: "Ventas",
    item:[{name:'Cliente',icon: <HomeIcon/>,url:'#cliente'},
        {name:'Proveedor',icon: <HomeIcon/>,url:'#proveedor'}] },

    { url: "#about", icon: <ReceiptIcon/>, name: "Compras",
    item:[{name:'Cliente',icon: <HomeIcon/>,url:'#cliente'},
        {name:'Proveedor',icon: <HomeIcon/>,url:'#proveedor'}] },

    { url: "#about", icon: <CategoryIcon/>, name: "Producción",
    item:[{name:'Cliente',icon: <HomeIcon/>,url:'#cliente'},
        {name:'Proveedor',icon: <HomeIcon/>,url:'#proveedor'}] },

    { url: "#about", icon: <AutoStoriesIcon/>, name: "Tesorería",
    item:[{name:'Cliente',icon: <HomeIcon/>,url:'#cliente'},
        {name:'Proveedor',icon: <HomeIcon/>,url:'#proveedor'}] },

    { url: "#about", icon: <DragIndicatorIcon/>, name: "Mantenimiento",
    item:[{name:'Cliente',icon: <HomeIcon/>,url:'#cliente'},
        {name:'Proveedor',icon: <HomeIcon/>,url:'#proveedor'}] },

    { url: "#about", icon: <PrecisionManufacturingIcon/>, name: "Servicios",
    item:[{name:'Cliente',icon: <HomeIcon/>,url:'#cliente'},
        {name:'Proveedor',icon: <HomeIcon/>,url:'#proveedor'}] },
];
