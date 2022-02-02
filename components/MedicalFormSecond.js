import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import RadioComponent from './RadioComponent';

const MedicalFormSecond = ({values, setValues}) => {
  const [saignement, setSaignement] = useState(values.saignementInterventionAccident|| false)
  
  const setCallbackToTrue = (cb)=>{
    cb(true)
  }
  const setCallbackToFalse = (cb)=>{
    cb(false)
  }

  return (
    <View style={{marginTop:20}}>
      <Text style={styles.label}>
        Avez-vous déjà eu un saignement anormal au cours d’une intervention ou d’un accident ? 
      </Text>
      <RadioComponent valueState={saignement} setValueToTrue = {()=>setCallbackToTrue(setSaignement)} setValueToFalse = {()=>setCallbackToFalse(setSaignement)}/>
    </View>
  );
};

export default MedicalFormSecond;

const styles = StyleSheet.create({
  label : {
    fontSize : 20,
    fontWeight:"bold",
    marginBottom:10,
    paddingRight:10,
    letterSpacing:0.75
  },
});
