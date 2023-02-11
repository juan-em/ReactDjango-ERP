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

  const setiEstate = () => {
    itemsPer.forEach((i) => {
      if (!item.id) {
        console.log("no item");
      }
    });
  };

  const seti = () => {
    const array = [];
    const newItem = itemsPer.map((i) => {
      if (!item.id) {
        console.log("no item");
      } else {
        console.log(item);
        if (i["primary"] === "Código") {
          return {
            ...i,
            secondary: item.codigo,
          };
        } else if (i["primary"] === "Nombre") {
          return {
            ...i,
            secondary: item.persona ? item.persona.nombre : item.empresa.nombre,
          };
        } else if (i["primary"] === "RUC o DNI") {
          return {
            ...i,
            secondary: item.persona ? item.persona.dni : item.empresa.ruc,
          };
        } else if (i["primary"] === "Provincia") {
          return {
            ...i,
            secondary: item.persona
            ? item.persona.codprovincia
            : item.empresa.codprovincia
          }
        } else if (i["primary"] === "Localidad") {
          return {
            ...i,
            secondary: item.persona
            ? item.persona.localidad
            : item.empresa.localidad
          }
        } else if (i["primary"] === "Dirección") {
          return {
            ...i,
            secondary: item.persona
            ? item.persona.direccion
            : item.empresa.direccion
          }
        } else if (i["primary"] === "Código Postal") {
          return {
            ...i,
            secondary:item.persona
            ? item.persona.codpostal
            : item.empresa.codpostal
          }
        } else if (i["primary"] === "Cuenta Bancaria") {
          return {
            ...i,
            secondary: item.persona
            ? item.persona.cuentabancaria
            : item.empresa.cuentabancaria
          }
        } else if (i["primary"] === "Teléfono") {
          return {
            ...i,
            secondary: item.persona
            ? item.persona.telefono
            : item.empresa.telefono
          }
        } else if (i["primary"] === "Móvil") {
          return {
            ...i,
            secondary: item.persona
            ? item.persona.movil
            : item.empresa.movil
          }
        } else if (i["primary"] === "Forma de Pago") {
          return {
            ...i,
            secondary:item.codformapago
          }
        }
      }
    });
    console.log(newItem);
    setItemsPer(newItem)
  };

  useEffect(() => {
    seti();
  }, [item]);

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
        <Accordion sx={{ p: 5 }}>
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
