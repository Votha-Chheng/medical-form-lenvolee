import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';

const RadioComponent = ({valueState, setValueToTrue, setValueToFalse}) => {

  return (
    <View style={styles.flexRow}>
      <View style={styles.flexRow}>
        <RadioButton
          value="OUI"
          status={ valueState ? 'checked' : 'unchecked' }
          onPress={setValueToTrue}
        />
        <Text 
          style={!valueState ? {fontSize: 15, color:"grey"} : {fontSize: 20, color:"black", fontWeight:"bold"}}
        >
          OUI
        </Text>
      </View>
      <View style={[styles.flexRow, {marginLeft:15}]}>
        <RadioButton
          value="NON"
          status={ !valueState ? 'checked' : 'unchecked' }
          onPress={setValueToFalse}
        />
        <Text 
          style={valueState ? {fontSize: 15, color:"grey"} : {fontSize: 20, color:"black", fontWeight:"bold"}}
        >
          NON
        </Text>
      </View>
    </View>
  );
};

export default RadioComponent;

const styles = StyleSheet.create({
  flexRow : {
    flexDirection:"row", 
    alignItems:"center",
    marginBottom:20
  },
});
