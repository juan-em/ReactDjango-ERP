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
  CardActions,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

//icons
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./index.css";
import Variantes from "./variantes";

const VerArticulo = ({itemView}) => {
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
      if (!itemView.id) {
        return {
          ...i,
        };
      } else {
        if (i.primary === "Código") {
          return {
            ...i,
            secondary: itemView.codigo,
          };
        } else if (i.primary === "Nombre") {
          return {
            ...i,
            secondary: itemView.nombre,
          };
        } else if (i.primary === "Descripción") {
          return {
            ...i,
            secondary: itemView.descripcion,
          };
        } else if (i.primary === "Proveedor") {
          return {
            ...i,
            secondary: itemView.nombre_proveedor || '-',
          };
        } else if (i.primary === "Marca") {
          return {
            ...i,
            secondary: itemView.marca,
          };
        } else if (i.primary === "Categoría") {
          return {
            ...i,
            secondary: itemView.nombre_categoria || '-',
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
          mt: 3,
          p: 0,
          backgroundColor: alpha("#633256", 0.2),
          "&:hover": {
            backgroundColor: alpha("#633256", 0.25),
          },
        }}
      >
        <Accordion sx={{ p: 5 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Artículo seleccionado
          </AccordionSummary>
          <AccordionDetails>
            <Card sx={{ p: 3 }} elevation={0}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <img
                    src={itemView.imagen}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <CardContent>
                    <List>
                      <Grid container spacing={0}>
                        {itemsPer.map((i, index) => (
                          <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
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
                    <Variantes variantes={itemView.variantes} id={itemView.id}/>
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
