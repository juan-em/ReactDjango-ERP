import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Venta from './src/venta/index'
import Factura from './src/facturas/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="VENTAS" component={Venta}/>
      <Tab.Screen name="FACTURAS" component={Factura}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
  <NavigationContainer>
    <MyTabs/>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});





// Librerias Usadas
// Libreria de Stepper
// https://github.com/danilrafiqi/react-native-stepper-ui/tree/f2f057fdc154980106cd72044d2ae0ff7055b29b
// Libreria estilos 
// react-native-material
// https://react-native-material.com/docs/layout/box
// react-native-paper
// https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator
// Libreria Datepicker
// https://github.com/henninghall/react-native-date-picker
// Libreria SelectDropdonw
// https://github.com/AdelRedaa97/react-native-select-dropdown/tree/d0c6d8acd346ff0b47a9bb32a902b52022644f6d
