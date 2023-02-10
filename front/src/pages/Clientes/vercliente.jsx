import { useEffect, useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
//icons
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeckIcon from "@mui/icons-material/Deck";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PinIcon from "@mui/icons-material/Pin";
import KeyIcon from "@mui/icons-material/Key";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import WebhookIcon from "@mui/icons-material/Webhook";
import { Box } from "@mui/system";

import Swal from "sweetalert2";

const VerCliente = ({ item }) => {
  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <DriveFileRenameOutlineIcon />, primary: "Nombre", secondary: "" },
    { icon: <FingerprintIcon />, primary: "RUC o DNI", secondary: "" },
    { icon: <DeckIcon />, primary: "Provincia", secondary: "" },
    { icon: <HomeWorkIcon />, primary: "Localidad", secondary: "" },
    { icon: <MyLocationIcon />, primary: "Dirección", secondary: "" },
    { icon: <PinIcon />, primary: "Código Postal", secondary: "" },
    { icon: <KeyIcon />, primary: "Cuenta Bancaria", secondary: "" },
    { icon: <LocalPhoneIcon />, primary: "Teléfono", secondary: "" },
    { icon: <PhoneAndroidIcon />, primary: "Móvil", secondary: "" },
    { icon: <AttachMoneyIcon />, primary: "Forma de Pago", secondary: "" },
  ]);

 
  const seti = () => {
    itemsPer.forEach((i)=>{
      if (item.id){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'intentelo nuevamente',
        });
      }
      if (item.persona){
        if (i['primary'] === 'Codigo'){
          i['secondary'] = item.codigo
        } else if (i['primary'] === 'Nombre'){
          i['secondary'] = item.persona.nombre
        } else if (i['primary'] === 'RUC o DNI'){
          i['secondary'] = item.persona.dni
        } else if (i['primary'] === 'Provincia'){
          i['secondary'] = item.persona.codprovincia
        } else if (i['primary'] === 'Localidad'){
          i['secondary'] = item.persona.localidad
        } else if (i['primary'] === 'Dirección'){
          i['secondary'] = item.persona.direccion
        } else if (i['primary'] === 'Código Postal'){
          i['secondary'] = item.persona.codpostal
        } else if (i['primary'] === 'Cuenta Bancaria'){
          i['secondary'] = item.persona.cuentabancaria
        } else if (i['primary'] === 'Teléfono'){
          i['secondary'] = item.persona.telefono
        } else if (i['primary'] === 'Móvil'){
          i['secondary'] = item.persona.movil
        }else if (i['primary'] === 'Forma de Pago'){
          i['secondary'] = item.codformapago
        }
      } else if (item.empresa){
        if (i['primary'] === 'Codigo'){
          i['secondary'] = item.codigo
        } else if (i['primary'] === 'Nombre'){
          i['secondary'] = item.empresa.nombre
        } else if (i['primary'] === 'RUC o DNI'){
          i['secondary'] = item.empresa.ruc
        } else if (i['primary'] === 'Provincia'){
          i['secondary'] = item.empresa.codprovincia
        } else if (i['primary'] === 'Localidad'){
          i['secondary'] = item.empresa.localidad
        } else if (i['primary'] === 'Dirección'){
          i['secondary'] = item.empresa.direccion
        } else if (i['primary'] === 'Código Postal'){
          i['secondary'] = item.empresa.codpostal
        } else if (i['primary'] === 'Cuenta Bancaria'){
          i['secondary'] = item.empresa.cuentabancaria
        } else if (i['primary'] === 'Teléfono'){
          i['secondary'] = item.empresa.telefono
        } else if (i['primary'] === 'Móvil'){
          i['secondary'] = item.empresa.movil
        }else if (i['primary'] === 'Forma de Pago'){
          i['secondary'] = item.codformapago
        }
      }
    })
  }

  useEffect(() => {seti()});

  return (
    <section>
      <Paper
        elevation={10}
        className="paper"
        sx={{
          mt: 4,
          p: 0,
          backgroundColor: alpha("#8D4C32", 0.2),
          "&:hover": {
            backgroundColor: alpha("#8D4C32", 0.25),
          },
        }}
      >
        <Accordion sx={{ p:5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Cliente seleccionado
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <Grid container spacing={0}>
                {itemsPer.map((i) => (
                  <Grid item xs={12} sm={6} md={6}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{i.icon}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={i.primary}
                        secondary={i.secondary}
                      />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </section>
  );
};

export default VerCliente;
