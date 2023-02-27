import HomeIcon from '@mui/icons-material/Home';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SellIcon from '@mui/icons-material/Sell';
import ArticleIcon from '@mui/icons-material/Article';
import ShopIcon from '@mui/icons-material/Shop';
import SubjectIcon from '@mui/icons-material/Subject';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ArchiveIcon from '@mui/icons-material/Archive';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AlbumIcon from '@mui/icons-material/Album';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ClassIcon from '@mui/icons-material/Class';
import CropIcon from '@mui/icons-material/Crop';

export const menuItems = [
    { url: "/", icon: <HomeIcon/>, name: "Inicio",
    item:[] },

    { url: "#comerciales", icon: <HandshakeIcon/>, name: "Inter. Comer.",
    item:[{name:'Clientes',icon: <SwitchAccountIcon/>,url:'/clientes'},
        {name:'Proveedores',icon: <SupportAgentIcon/>,url:'/proveedores'},
        {name:'Trabajadores',icon: <EngineeringIcon/>,url:'/trabajadores'}] },

    { url: "#contact", icon: <Inventory2Icon/>, name: "Productos",
    item:[{name:'Productos',icon: <ArtTrackIcon/>,url:'#cliente'},
        {name:'Articulos',icon: <AlbumIcon/>,url:'/productos/articulos'}] },

    { url: "#about", icon: <AttachMoneyIcon/>, name: "Ventas",
    item:[{name:'Venta',icon: <SellIcon/>,url:'/ventas/venta'},
        {name:'Facturas',icon: <ArticleIcon/>,url:'#proveedor'},
        {name:'Remision',icon: <SubjectIcon/>,url:'#proveedor'}] },

    { url: "#about", icon: <ReceiptIcon/>, name: "Compras",
    item:[{name:'Compra',icon: <ShopIcon/>,url:'/compras/compra'},
        {name:'Factura',icon: <ArticleIcon/>,url:'#proveedor'},
        {name:'Remision',icon: <SubjectIcon/>,url:'#proveedor'}] },

    { url: "#about", icon: <CategoryIcon/>, name: "Producción",
    item:[{name:'Produccion',icon: <ProductionQuantityLimitsIcon/>,url:'/produccion/produccion'}] },

    { url: "#about", icon: <AutoStoriesIcon/>, name: "Tesorería",
    item:[{name:'Caja Diaria',icon: <PointOfSaleIcon/>,url:'#cliente'},
        {name:'Libro Diario',icon: <BookmarkIcon/>,url:'#proveedor'}] },

    { url: "#about", icon: <DragIndicatorIcon/>, name: "Mantenimiento",
    item:[{name:'Provincias',icon: <WhereToVoteIcon/>,url:'/mantenimientos/provincias'},
        {name:'Formas de Pago',icon: <CreditCardIcon/>,url:'/mantenimientos/formaspago'},
        {name:'Entidades',icon: <LocalConvenienceStoreIcon/>,url:'/mantenimientos/entidades'},
        {name:'Almacenes',icon: <AddBusinessIcon/>,url:'/mantenimientos/almacenes'},
        {name:'Impuestos',icon: <RequestQuoteIcon/>,url:'/mantenimientos/impuestos'},
        {name:'Embalajes',icon: <ArchiveIcon/>,url:'/mantenimientos/embalajes'},
        {name:'Áreas',icon: <CropIcon/>,url:'/mantenimientos/areas'},
        {name:'Cat. Artículos',icon: <AutoAwesomeMosaicIcon/>,url:'/mantenimientos/categorias'},
        {name:'Cat. Productos',icon: <ClassIcon/>,url:'/mantenimientos/categoriasproductos'},]},

    { url: "#about", icon: <PrecisionManufacturingIcon/>, name: "Servicios",
    item:[{name:'Servicios',icon: <ElectricalServicesIcon/>,url:'#cliente'}] },
];
