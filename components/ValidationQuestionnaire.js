import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { globalStyles } from '../globalStyles';

const ValidationQuestionnaire = ({values, setValues}) => {

  const validationQuestionnaire = ()=>{
    console.log(values)
  }

  return (
    <View style={[globalStyles.container, {alignItems:"center", marginVertical:30}]}>
      <View style={[globalStyles.flexRow, {flexWrap:"wrap", justifyContent:"center"}]}>
        <Text style={[globalStyles.label, {marginBottom:-10}]}>
          Assurez-vous qu'il ne reste pas de questions en 
        </Text>
        <Text style={[globalStyles.label, {color:"red", marginBottom:-10}]}>
          rouge
        </Text>
        <Text style={globalStyles.label}>
          avant de valider le questionnaire.
        </Text>
      </View>
      
       
      <Button
        mode='contained'
        dark={true}
        onPress={validationQuestionnaire}
        style={{backgroundColor:"green", width:550}}
        labelStyle={{fontSize:15}}
      >
        Appuyer ici pour valider le questionnaire
      </Button>
    </View>
  );
};

export default ValidationQuestionnaire;

const styles = StyleSheet.create({});
