import react from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const PantallaInicio = ({ navigation }) => {
  return (
    <View>
      <Button onPress={() => navigation.navigate("Venta")}>
        INICIAR VENTAS
      </Button>
    </View>
  );
};

export default PantallaInicio;


const styles = StyleSheet.create({
  
  scrollView: {
    maxHeight: "100vh",
  },
  step:{}
});