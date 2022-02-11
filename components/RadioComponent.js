import { Text, View } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';
import { globalStyles } from '../globalStyles';

const RadioComponent = ({valueState, setValueToTrue, setValueToFalse}) => {

  return (
    <View style={globalStyles.flexRow}>
      <View style={globalStyles.flexRow}>
        <RadioButton
          value="OUI"
          status={valueState===undefined? 'unchecked' : valueState ? 'checked' : 'unchecked' }
          onPress={setValueToTrue}
        />
        <Text 
          style={valueState===undefined || !valueState ? {fontSize: 20, color:"grey"} : {fontSize: 20, color:"green", fontWeight:"bold"}}
        >
          OUI
        </Text>
      </View>
      <View style={[globalStyles.flexRow, {marginLeft:15}]}>
        <RadioButton
          value="NON"
          status={valueState===undefined? 'unchecked' : !valueState ? 'checked' : 'unchecked' }
          onPress={setValueToFalse}
        />
        <Text 
          style={valueState===undefined || valueState ? {fontSize: 20, color:"grey"} : {fontSize: 20, color:"green", fontWeight:"bold"}}
        >
          NON
        </Text>
      </View>
    </View>
  );
};

export default RadioComponent;

