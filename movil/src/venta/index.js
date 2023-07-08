import React, { useState, Fragment, useReducer, useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
// Libreria de Stepper
// https://github.com/danilrafiqi/react-native-stepper-ui/tree/f2f057fdc154980106cd72044d2ae0ff7055b29b
import Stepper from "react-native-stepper-ui";
import Paso1 from "./paso1";
import Paso2 from "./paso2";
import Paso3 from "./paso3"

import { INITIAL_STATE, ventasReducer, ACTION_TYPES } from "./reducer";

import { BuildVentaPayload, RegistroVenta } from "../services/ventas";
const Venta = () => {
  //Registration's Fuctionality
  const [state, dispatch] = React.useReducer(ventasReducer, INITIAL_STATE);

  //Steps's Functionality
  const [activeStep, setActiveStep] = useState(0);

  const handleReset = () => {
    dispatch({
      type: ACTION_TYPES.RESET_VENTA,
    });
    setActiveStep(0);
  };

  const handleRegister = () => {
    if (state.venta.detalle_venta.length) {
      var payload = BuildVentaPayload(state.venta);
      RegistroVenta(payload);
      console.log(payload);
      // handleNext();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cliente o productos NO válidos",
      });
    }
  };

  console.log(state);

  const content = [
    <Paso1 state={state} dispatch={dispatch} />,
    <Paso2 state={state} dispatch={dispatch} />,
    <Paso3 state={state} dispatch={dispatch} />,
  ];

  return (
    <View>
      <Text>VENTA</Text>
      <ScrollView style={styles.scrollView}>
      <Stepper
        active={activeStep}
        stepStyle={styles.setep}
        content={content}
        onBack={() => {
          setActiveStep((p) => -1);
          handleReset();
        }}
        onFinish={() => {
          handleRegister();
          handleReset();
        }}
        onNext={() => {
          setActiveStep((p) => p + 1);
        }}
      />
    </ScrollView>
    </View>
  );
};
export default Venta;


const styles = StyleSheet.create({
  
  scrollView: {
    maxHeight: "100vh",
  },
  step:{}
});