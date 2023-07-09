import react, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  IconButton,
  Modal,
  Portal,
  Button,
  PaperProvider,
  Text,
  Card,
  List
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
          {/* <Card.Cover source={{uri: 'https://img.menzig.style/a/1000/1465-h0.jpg'}}/> */}
          <Card.Content>
            <List.Item
              title="CODIGO"
              description={itemView.codigo}
              left={props => <List.Icon {...props} icon="pound" color="#633256" style={styles.icon}/>}
            />
            <List.Item
              title="FECHA"
              description={itemView.fecha}
              left={props => <List.Icon {...props} icon="calendar-range" color="#633256" style={styles.icon}/>}
            />            
            <List.Item
              title="CLIENTE"
              description={itemView.nombre_cliente}
              left={props => <List.Icon {...props} icon="account" color="#633256" style={styles.icon}/>}
            />           
            <List.Item
              title="ESTADO"
              description={itemView.estado_remision}
              left={props => <List.Icon {...props} icon="exclamation" color="#633256" style={styles.icon}/>}
            />
            <List.Item
              title="TOTAL"
              description={itemView.total}
              left={props => <List.Icon {...props} icon="currency-usd"  color="#633256" style={styles.icon}/>}
            />
          </Card.Content>
          
        </Card>
      )}
    </View>
  );
};

export default VerFactura;


const styles = StyleSheet.create({
  textLabel:{
    fontWeight:"bold",
    fontSize:'0.9rem',
  },
  textContent:{
    marginBottom:'5px'
  },
  icon:{
    paddingLeft:'5px',
    paddingRight:'5px',
    borderRadius:'50%',
    backgroundColor:'#e0d6dd'
  }
 
});

