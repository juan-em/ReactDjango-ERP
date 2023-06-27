import React, { useState, Fragment, useReducer, useContext } from "react";
import { View, Text } from "react-native";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Autocomplete,
  Typography,
} from "@react-native-material/core";
// Libreria de Stepper
// https://github.com/danilrafiqi/react-native-stepper-ui/tree/f2f057fdc154980106cd72044d2ae0ff7055b29b
import Stepper from "react-native-stepper-ui";
import Paso1 from "./paso1";
import Paso2 from "./paso2";

import { INITIAL_STATE, ventasReducer, ACTION_TYPES } from "./reducer";

const Venta = () => {
  //Registration's Fuctionality
  const [state, dispatch] = React.useReducer(ventasReducer, INITIAL_STATE);

  //Steps's Functionality
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [tipo, setTipo] = useState(false);
  const [sesionIniciada, setSesionIniciada] = useState(false);

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  // const isStepSkipped = (step) => {
  //   return skipped.has(step);
  // };

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    dispatch({
        type: ACTION_TYPES.RESET_VENTA,
      });
    setActiveStep(0);
  };

  const handleRegister = () => {
    if (
      Reflect.has(state.venta.cliente, "id")
    ) {
      var payload = BuildVentaPayload(state.venta);
      RegistroVenta(payload);
      console.log(payload);
      handleNext();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cliente o productos NO válidos",
      });
    }
  };

  const content = [
    <Paso1
      state={state}
      dispatch={dispatch}
    />,
    <Paso2 />,
  ];

  return (
    <View>
      <div>
        <Stepper
          active={activeStep}
          content={content}
          onBack={() => {
            setActiveStep((p) => -1)
            handleReset()
          }}
          onFinish={() => {
            alert("Finish")
            handleRegister()
          }}
          onNext={() => {
            setActiveStep((p) => p + 1)
          }}
        />
      </div>
    </View>

    // <View>
    //   <div className="container">
    //     {!tipo ? (
    //       <Grid container spacing={4}>
    //         <Grid item xs={12} sm={12} md={12}>
    //           <Stepper active={activeStep} sx={{ p: 5 }}>
    //             {steps.map((label, index) => {
    //               const stepProps = {};
    //               const labelProps = {};
    //               if (isStepOptional(index)) {
    //                 labelProps.optional = (
    //                   <Typography variant="caption" fontFamily={"inherit"}>
    //                     Opcional
    //                   </Typography>
    //                 );
    //               }
    //               if (isStepSkipped(index)) {
    //                 stepProps.completed = false;
    //               }
    //               return (
    //                 <Step key={label} {...stepProps}>
    //                   <StepLabel {...labelProps}>
    //                     <span>{label}</span>
    //                   </StepLabel>
    //                 </Step>
    //               );
    //             })}
    //           </Stepper>
    //           {activeStep === steps.length ? (
    //             <Fragment>
    //               <Alert
    //                 severity="success"
    //                 sx={{ p: 3, m: 5 }}
    //                 action={
    //                   <Button
    //                     variant="contained"
    //                     id="textfields"
    //                     onClick={handleReset}
    //                   >
    //                     Nueva Venta
    //                   </Button>
    //                 }
    //               >
    //                 <AlertTitle>
    //                   Se logró registrar la orden de venta
    //                 </AlertTitle>
    //               </Alert>
    //             </Fragment>
    //           ) : activeStep + 1 === 1 ? (
    //             <Fragment>
    //               <Paso1
    //                 state={state}
    //                 dispatch={dispatch}
    //                 sesionIniciada={sesionIniciada}
    //                 setSesionIniciada={setSesionIniciada}
    //                 statePuntoVenta={statePuntoVenta}
    //                 dispatchPuntoVenta={dispatchPuntoVenta}
    //               />
    //               <Box sx={{ display: "flex", flexDirection: "row", pt: 5 }}>
    //                 <Box sx={{ flex: "1 1 auto" }} />
    //                 {isStepOptional(activeStep) && (
    //                   <Button onClick={handleSkip} sx={{ mr: 1 }}>
    //                     Saltar
    //                   </Button>
    //                 )}
    //                 <Button
    //                   onClick={handleNext}
    //                   id="textfields"
    //                   variant="contained"
    //                   color="secondary"
    //                 >
    //                   {activeStep === steps.length - 1
    //                     ? "Terminar"
    //                     : "Siguiente"}
    //                 </Button>
    //               </Box>
    //             </Fragment>
    //           ) : (
    //             <Fragment>
    //               <Paso2
    //                 state={state}
    //                 dispatch={dispatch}
    //                 sesionIniciada={sesionIniciada}
    //                 setSesionIniciada={setSesionIniciada}
    //                 statePuntoVenta={statePuntoVenta}
    //                 dispatchPuntoVenta={dispatchPuntoVenta}
    //                 stateSesion={stateSesion}
    //                 dispatchSesion={dispatchSesion}
    //               />
    //               <Box sx={{ display: "flex", flexDirection: "row", pt: 5 }}>
    //                 <Button
    //                   color="inherit"
    //                   disabled={activeStep === 0}
    //                   onClick={handleBack}
    //                   sx={{ mr: 1 }}
    //                   id="textfields"
    //                   variant="contained"
    //                 >
    //                   Volver
    //                 </Button>
    //                 <Box sx={{ flex: "1 1 auto" }} />
    //                 {isStepOptional(activeStep) && (
    //                   <Button
    //                     color="inherit"
    //                     onClick={handleSkip}
    //                     sx={{ mr: 1 }}
    //                     id="textfields"
    //                     variant="contained"
    //                   >
    //                     Saltar
    //                   </Button>
    //                 )}

    //                 {activeStep === steps.length - 1 ? (
    //                   <>
    //                     <Button
    //                       onClick={
    //                         !sesionIniciada
    //                           ? handleRegister
    //                           : handleRegisterPuntoVenta
    //                       }
    //                       id="textfields"
    //                       variant="contained"
    //                       color="secondary"
    //                     >
    //                       Terminar
    //                     </Button>
    //                   </>
    //                 ) : (
    //                   <Button
    //                     onClick={handleNext}
    //                     id="textfields"
    //                     variant="contained"
    //                     color="secondary"
    //                   >
    //                     Siguiente
    //                   </Button>
    //                 )}
    //               </Box>
    //             </Fragment>
    //           )}
    //         </Grid>
    //       </Grid>
    //     ) : (
    //       <>
    //         <SesionVenta
    //           setTipo={setTipo}
    //           tipo={tipo}
    //           stateSesion={stateSesion}
    //           dispatchSesion={dispatchSesion}
    //           sesionIniciada={sesionIniciada}
    //           setSesionIniciada={setSesionIniciada}
    //         />
    //       </>
    //     )}
    //   </div>
    // </View>
  );
};
export default Venta;
