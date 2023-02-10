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

const VerCliente = () => {
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
    { icon: <WebhookIcon />, primary: "Empresa", secondary: "" },
  ]);

  useEffect(()=>{
    
  },[])

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