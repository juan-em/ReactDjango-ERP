import react from 'react'
import {View, Text, TextComponent, StyleSheet} from 'react-native'
import { Button } from 'react-native-paper'
 
const Paso3 = ({state, dispatch}) => {
    return (
        <View>
            <Text style={styles.text} >SE COMPLETO LA VENTA</Text>
        </View>
    )
}

export default Paso3


const styles = StyleSheet.create({
  
  text: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  
});