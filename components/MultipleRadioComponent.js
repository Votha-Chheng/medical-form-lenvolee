import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../globalStyles';
import { RadioButton } from 'react-native-paper';

const MultipleRadioComponent = ({arrayChoix, valueState, handleOnPress}) => {
  return (
    arrayChoix ? 
    arrayChoix.map((choix, index)=>(
      <View key={index.toString()} style={[globalStyles.flexRow, {marginBottom:0}]}>
        <RadioButton
          value={choix}
          status={valueState===undefined || !valueState? 'unchecked' : valueState===choix ? 'checked' : 'unchecked' }
          onPress={()=>handleOnPress(choix)}
        />
        <Text 
          style={
            valueState===undefined || valueState !== choix 
            ? 
            {fontSize: 20, color:"grey"} 
            : 
            {fontSize: 20, color:"green", fontWeight:"bold"}
          }
        >
          {choix}
        </Text>
      </View>
    ))
    :
    null
  );
};

export default MultipleRadioComponent;

const styles = StyleSheet.create({});
