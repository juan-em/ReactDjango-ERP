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
  Button,
  Stack,
  CardActions,
} from "@mui/material";

import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

//icons
import NumbersIcon from "@mui/icons-material/Numbers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import InventoryIcon from '@mui/icons-material/Inventory';
import RemisionesVentas from "../Remisiones";
import Remisiones from "./remisiones";

const VerFactura = (itemView) => {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <DescriptionIcon />, primary: "Factura", secondary: "" },
    { icon: <PersonIcon />, primary: "Cliente", secondary: "" },
    { icon: <InventoryIcon />, primary: "N° Productos", secondary: "" },
    { icon: <CalendarMonthIcon />, primary: "Fecha", secondary: "" }
  ]);

  const seti = () => {
    const newItem = itemsPer.map((i) => {
      if (!itemView.itemView.id) {
        return {
          ...i,
        };
      } else {
        if (i.primary === "Código") {
          return {
            ...i,
            secondary: itemView.itemView.id,
          };
        } else if (i.primary === "Nombre") {
          return {
            ...i,
            secondary: itemView.itemView.nombre,
          };
        }
      }
    });
    setItemsPer(newItem);
  };

  useEffect(() => {
    seti();
  }, [itemView]);

  const theme = useTheme();

  return (
    <section>
      <Paper
        elevation={10}
        className="paper"
        sx={{
          mt: 4,
          p: 0,
          backgroundColor: alpha("#633256", 0.2),
          "&:hover": {
            backgroundColor: alpha("#633256", 0.25),
          },
        }}
      >
        <Accordion sx={{ p: 5 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Factura seleccionada (Ventas)
          </AccordionSummary>
          <AccordionDetails>
            <Card sx={{ p: 3 }} elevation={0}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  {/*
                    <CardMedia
                      style={{ objectFit:'cover' }}
                      image="https://i.pinimg.com/564x/8a/7c/f1/8a7cf1bad7f0bb30d39b3e309560a2a2.jpg"
                    />
                  */}
                  <img src="https://i.pinimg.com/564x/8a/7c/f1/8a7cf1bad7f0bb30d39b3e309560a2a2.jpg" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <CardContent>
                    <List>
                      <Grid container spacing={0}>
                        {itemsPer.map((i) => (
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar sx={{
                                backgroundColor: alpha('#633256', 0.20),
                                '&:hover': {
                                    backgroundColor: alpha('#633256', 0.25),
                                }, color:'#633256'
                                }}>{i.icon}</Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={<span>{i.primary}</span>}
                                secondary={i.secondary}
                              />
                            </ListItem>
                          </Grid>
                        ))}
                      </Grid>
                    </List>
                  </CardContent>
                </Grid>
              </Grid>

              <CardActions>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Remisiones item={itemView.producto_variante} open={open} setOpen={setOpen} />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </section>
  );
};

export default VerFactura;