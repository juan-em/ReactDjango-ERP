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
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert2";

const VerCategoria = (itemView) => {
  const [itemsPer, setItemsPer] = useState([
    { icon: <NumbersIcon />, primary: "Código", secondary: "" },
    { icon: <DriveFileRenameOutlineIcon />, primary: "Nombre", secondary: "" }
  ]);

console.log(itemView.itemView.id)
  const seti = () => {
    const newItem = itemsPer.map((i) => {
      console.log(itemView.id)
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
          console.log(i)
          return {
            ...i,
            secondary: itemView.itemView.nombreentidad,
          };
        } 
      }
    });
    setItemsPer(newItem);
  };

  useEffect(()=>{
    seti()
    console.log(itemsPer)
  },[itemView])

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
            Categoría seleccionada
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <Grid container spacing={0}>
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

export default VerCategoria;