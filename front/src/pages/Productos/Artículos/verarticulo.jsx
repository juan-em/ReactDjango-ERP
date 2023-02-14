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
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FlakyIcon from '@mui/icons-material/Flaky';
import DatasetIcon from '@mui/icons-material/Dataset';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import WidgetsIcon from '@mui/icons-material/Widgets';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TitleIcon from '@mui/icons-material/Title';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Box } from "@mui/system";

const VerArticulo = () => {
  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <DriveFileRenameOutlineIcon />, primary: "Nombre", secondary: "" },
    { icon: <AutoAwesomeMosaicIcon />, primary: "Categoría", secondary: "" },
    { icon: <DescriptionIcon />, primary: "Descripción", secondary: "" },
    { icon: <AttachMoneyIcon />, primary: "Impuesto", secondary: "" },
    { icon: <PersonSearchIcon />, primary: "Proveedor", secondary: "" },
    { icon: <WbIncandescentIcon />, primary: "Descripción corta", secondary: "" },
    { icon: <MyLocationIcon />, primary: "Ubicación", secondary: "" },
    { icon: <Inventory2Icon />, primary: "Stock", secondary: "" },
    { icon: <MoveToInboxIcon />, primary: "Stock Mínimo", secondary: "" },
    { icon: <FlakyIcon />, primary: "Aviso Mínimo", secondary: "" },
    { icon: <DatasetIcon />, primary: "Datos del artículo", secondary: "" },
    { icon: <CalendarMonthIcon />, primary: "Fecha de alta", secondary: "" },
    { icon: <AllInboxIcon />, primary: "Embalaje", secondary: "" },
    { icon: <WidgetsIcon />, primary: "Unidades por caja", secondary: "" },
    { icon: <RemoveRedEyeIcon />, primary: "Observaciones", secondary: "" },
    { icon: <PriceCheckIcon />, primary: "Precio Compra", secondary: "" },
    { icon: <LocalOfferIcon />, primary: "Precio Tienda", secondary: "" },
    { icon: <TitleIcon />, primary: "Tipo", secondary: "" },
    { icon: <InsertPhotoIcon />, primary: "Imagen", secondary: "" }
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
        <Accordion sx={{ p:5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Artículo seleccionado
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <Grid container spacing={1}>
                {itemsPer.map((i) => (
                    <Grid item xs={12} sm={6} md={6} lg={6}>
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

export default VerArticulo;