import react, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  IconButton,
  Modal,
  Portal,
  Button,
  PaperProvider,
  Text
} from "react-native-paper";
// import { formateoFecha } from "../../../services/compras";

const VerFactura = ({ itemView }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  //   const [open, setOpen] = useState(false);
  //   const [itemsPer, setItemsPer] = useState([
  //     { icon: <NumbersIcon />, primary: "Codigo", secondary: "" },
  //     { icon: <CalendarMonthIcon />, primary: "Fecha", secondary: "" },
  //     { icon: <StoreIcon />, primary: "Cliente", secondary: "" },
  //     { icon: <InfoIcon />, primary: "Estado", secondary: "" },
  //     { icon: <InfoIcon />, primary: "Estado Remision", secondary: "" },
  //     { icon: <DiscountIcon />, primary: "N° Factura", secondary: "" },
  //     { icon: <InfoIcon />, primary: "Detalle de entrega", secondary: "" },
  //     { icon: <AttachMoneyIcon />, primary: "Total de venta", secondary: "" },
  //   ]);

  //   const [remisiones, setRemisiones] = useState([]);
  //   console.log(itemView);
  //   const seti = () => {
  //     const newItem = itemsPer.map((i) => {
  //       if (!itemView.id) {
  //         return {
  //           ...i,
  //         };
  //       } else {
  //         if (i.primary === "Codigo") {
  //           return {
  //             ...i,
  //             secondary: itemView.codigo,
  //           };
  //         } else if (i.primary === "Fecha") {
  //           return {
  //             ...i,
  //             secondary: formateoFecha(itemView.fecha),
  //           };
  //         } else if (i.primary === "Cliente") {
  //           return {
  //             ...i,
  //             secondary: itemView.nombre_cliente,
  //           };
  //         } else if (i.primary === "Estado") {
  //           return {
  //             ...i,
  //             secondary: itemView.borrado ? "Anulado" : "Vigente",
  //           };
  //         } else if (i.primary === "Estado Remision") {
  //           return {
  //             ...i,
  //             secondary: itemView.estado_remision,
  //           };
  //         } else if (i.primary === "N° Factura") {
  //           return {
  //             ...i,
  //             secondary: itemView.numero_factura,
  //           };
  //         } else if (i.primary === "Detalle de entrega") {
  //           return {
  //             ...i,
  //             secondary: itemView.detalle_entrega,
  //           };
  //         } else if (i.primary === "Total de venta") {
  //           return {
  //             ...i,
  //             secondary: `S/. ${itemView.total}`,
  //           };
  //         }
  //       }
  //     });
  //     setItemsPer(newItem);
  //     setRemisiones(itemView.remision ? itemView.remision : []);
  //   };

  //   useEffect(() => {
  //     seti();
  //   }, [itemView]);

  //   const theme = useTheme();

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
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
