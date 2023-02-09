import {
    Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar,
    Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import { alpha } from '@mui/material/styles';
//icons
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeckIcon from '@mui/icons-material/Deck';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PinIcon from '@mui/icons-material/Pin';
import KeyIcon from '@mui/icons-material/Key';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WebhookIcon from '@mui/icons-material/Webhook';

const VerCliente = () => {
    
    const items = [
        {icon:<NumbersIcon />, primary:"Código", secondary:"codigocliente"},
        {icon:<DriveFileRenameOutlineIcon />, primary:"Nombre", secondary:"nombre"},
        {icon:<FingerprintIcon />, primary:"RUC o DNI", secondary:"ruc o dni"},
        {icon:<DeckIcon />, primary:"Provincia", secondary:"nombre"},
        {icon:<HomeWorkIcon />, primary:"Localidad", secondary:"nombre"},
        {icon:<MyLocationIcon />, primary:"Dirección", secondary:"nombre"},
        {icon:<PinIcon />, primary:"Código Postal", secondary:"nombre"},
        {icon:<KeyIcon />, primary:"Cuenta Bancaria", secondary:"nombre"},
        {icon:<LocalPhoneIcon />, primary:"Teléfono", secondary:"telefono"},
        {icon:<PhoneAndroidIcon />, primary:"Móvil", secondary:"telefono"},
        {icon:<AttachMoneyIcon />, primary:"Forma de Pago", secondary:"forma de pago"},
        {icon:<WebhookIcon />, primary:"Empresa", secondary:"empresa si o no"}
    ];

    return (
        <section>
            <Paper elevation={10} className="paper" sx={{ mt: 4, p: 0 ,backgroundColor: alpha('#8D4C32', 0.20),
            '&:hover': {
                backgroundColor: alpha('#8D4C32', 0.25),
            },}}>
                <Accordion sx={{ p:5 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        Cliente seleccionado
                    </AccordionSummary>
                    <AccordionDetails>
                        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>

                            {items.map((i) => (
                                <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    {i.icon}
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={i.primary} secondary={i.secondary} />
                            </ListItem>
                            )
                            )}
                            
                        </List>
                    </AccordionDetails>
                </Accordion>
              
            </Paper>
        </section>
    );
};
  
export default VerCliente;
  