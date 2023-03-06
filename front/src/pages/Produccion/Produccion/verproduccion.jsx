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
  Grid, Button, Stack, CardActions
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
//icons
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StyleIcon from '@mui/icons-material/Style';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Swal from "sweetalert2";
import './index.css';
import Detalles from "./detalles";

const VerProduccion = (itemView) => {
  const [openModal, setOpenModal] = useState(false);

  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código (N° de producción)", secondary: "" },
    { icon: <DriveFileRenameOutlineIcon />, primary: "N° de factura", secondary: "" },
    { icon: <ProductionQuantityLimitsIcon />, primary: "N° de productos", secondary: "" },
    { icon: <PlayCircleFilledIcon/>, primary: "Fecha de inicio", secondary: "" },
    { icon: <PauseCircleIcon />, primary: "Fecha de fin", secondary: "" },
    { icon: <StyleIcon />, primary: "Estado", secondary: "" },
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

  useEffect(()=>{
    seti()
  },[itemView])

  const theme = useTheme();

  return (
    
    <section>
      <Paper
        elevation={10}
        className="paper"
        sx={{
          mt: 3,
          p: 0,
          backgroundColor: alpha("#633256", 0.2),
          "&:hover": {
            backgroundColor: alpha("#633256", 0.25),
          },
        }}
      >
        <Accordion sx={{ p:5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            Producción seleccionada
          </AccordionSummary>
          <AccordionDetails>
                    <List>
                      <Grid container spacing={0}>
                          {itemsPer.map((i) => (
                            <Grid key={i.primary} item xs={12} sm={6} md={6}>
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
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Detalles/>
                  </Grid>
                </Grid>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </section>
  );
};

export default VerProduccion;