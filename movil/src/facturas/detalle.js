import react, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  IconButton,
  Modal,
  Portal,
  Button,
  PaperProvider,
  Text,
  Card,
} from "react-native-paper";
// import { formateoFecha } from "../../../services/compras";

const VerFactura = ({ itemView }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  console.log(itemView);

  return (
    <View>
      {itemView === undefined ? (
        <View></View>
      ) : (
        <Card>
          <Card.Cover />
          <Card.Content>
            <Text>CODIGO</Text>
            <Text>{itemView.codigo}</Text>
            <Text>FECHA</Text>
            <Text>{itemView.fecha}</Text>
            <Text>CLIENTE</Text>
            <Text>{itemView.nombre_cliente}</Text>
            <Text>ESTADO REMISION</Text>
            <Text>{itemView.estado_remision}</Text>
            <Text>TOTAL</Text>
            <Text>{itemView.total}</Text>
          </Card.Content>
          
        </Card>
      )}
    </View>
    // <section>
    //   <Paper
    //     elevation={10}
    //     className="paper"
    //     sx={{
    //       mt: 4,
    //       p: 0,
    //       backgroundColor: alpha("#633256", 0.2),
    //       "&:hover": {
    //         backgroundColor: alpha("#633256", 0.25),
    //       },
    //     }}
    //   >
    //     <Accordion sx={{ p: 5 }}>
    //       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    //         Factura seleccionada (Ventas)
    //       </AccordionSummary>
    //       <AccordionDetails>
    //         <Card sx={{ p: 3 }} elevation={0}>
    //           <Grid container spacing={1}>
    //             <Grid item xs={12} sm={12} md={12} lg={6}>
    //               {/*
    //                 <CardMedia
    //                   style={{ objectFit:'cover' }}
    //                   image="https://i.pinimg.com/564x/8a/7c/f1/8a7cf1bad7f0bb30d39b3e309560a2a2.jpg"
    //                 />
    //               */}
    //               <img src="https://i.pinimg.com/564x/8a/7c/f1/8a7cf1bad7f0bb30d39b3e309560a2a2.jpg" />
    //             </Grid>
    //             <Grid item xs={12} sm={12} md={12} lg={6}>
    //               <CardContent>
    //                 <List>
    //                   <Grid container spacing={0}>
    //                     {itemsPer.map((i) => (
    //                       <Grid item xs={12} sm={12} md={12} lg={12}>
    //                         <ListItem>
    //                           <ListItemAvatar>
    //                             <Avatar sx={{
    //                             backgroundColor: alpha('#633256', 0.20),
    //                             '&:hover': {
    //                                 backgroundColor: alpha('#633256', 0.25),
    //                             }, color:'#633256'
    //                             }}>{i.icon}</Avatar>
    //                           </ListItemAvatar>
    //                           <ListItemText
    //                             primary={<span>{i.primary}</span>}
    //                             secondary={i.secondary}
    //                           />
    //                         </ListItem>
    //                       </Grid>
    //                     ))}
    //                   </Grid>
    //                 </List>
    //               </CardContent>
    //             </Grid>
    //           </Grid>

    //           <CardActions>
    //             <Grid container spacing={1}>
    //               <Grid item xs={12} sm={12} md={12} lg={12}>
    //                 <Remisiones item={itemView.producto_variante} open={open} setOpen={setOpen} />
    //               </Grid>
    //             </Grid>
    //           </CardActions>
    //         </Card>
    //       </AccordionDetails>
    //     </Accordion>
    //   </Paper>
    // </section>
  );
};

export default VerFactura;
