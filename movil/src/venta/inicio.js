import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { postCaja, patchCaja, getLastCaja } from "../services/ventas";

const PantallaInicio = ({ navigation }) => {
  const [itemCaja, setItemCaja] = useState({
    estado_caja: false,
    registros_caja: [],
  });

  const handleOpenCloseCaja = async () => {
    if (itemCaja.estado_caja) {
      await patchCaja(itemCaja.id, {
        estado_caja: false,
        responsable_cierre: 1,
      });
    } else {
      await postCaja({
        estado_caja: true,
        responsable_apertura: 1,
        monto_inicial:100.0,
      });
    }
  };

  useEffect(() => {
    getLastCaja(setItemCaja, "tesoreria");
  }, []);

  return (
    <View>
      <Button
        onPress={() => {
          navigation.navigate("Venta");
          handleOpenCloseCaja();
        }}
      >
        {itemCaja.estado_caja == true ? "CERRAR CAJA" : "ABRIR CAJA"}
      </Button>
    </View>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: "100vh",
  },
  step: {},
});
