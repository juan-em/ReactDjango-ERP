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
import Swal from "sweetalert2";
import './index.css';
import Variantes from "./variantes";

const VerArticulo = (itemView) => {
  const [openModal, setOpenModal] = useState(false);

  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <DriveFileRenameOutlineIcon />, primary: "Nombre", secondary: "" },
    { icon: <NumbersIcon />, primary: "Descripción", secondary: "" },
    { icon: <NumbersIcon />, primary: "Proveedor", secondary: "" },
    { icon: <NumbersIcon />, primary: "Marca", secondary: "" },
    { icon: <NumbersIcon />, primary: "Categoría", secondary: "" },
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
            Artículo seleccionado
          </AccordionSummary>
          <AccordionDetails>

            <Card sx={{ p:3 }} elevation={0}>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  {/*
                    <CardMedia
                      style={{ objectFit:'cover' }}
                      image="https://i.pinimg.com/564x/8a/7c/f1/8a7cf1bad7f0bb30d39b3e309560a2a2.jpg"
                    />
                  */}
                  <img
                    src="https://i.pinimg.com/564x/8a/7c/f1/8a7cf1bad7f0bb30d39b3e309560a2a2.jpg"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <CardContent >
                  <List>
                    <Grid container spacing={0}>
                      {itemsPer.map((i) => (
                          <Grid item xs={12} sm={12} md={12} lg={12}>
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
                  </CardContent>

                </Grid>
              </Grid>

              <CardActions>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Variantes/>
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

export default VerArticulo;