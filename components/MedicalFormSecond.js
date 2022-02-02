import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import RadioComponent from './RadioComponent';

const MedicalFormSecond = ({values, setValues}) => {

  
  const setSaignementToTrue = ()=>{
    setValues({...values, saignementInterventionAccident: true})
  }
  const setSaignementToFalse = ()=>{
    setValues({...values, saignementInterventionAccident: false})
  }
  const setRadiationsToTrue = ()=>{
    setValues({...values, traitementRadiations: true})
  }
  const setRadiationsToFalse = ()=>{
    setValues({...values, traitementRadiations: false})
  }
  const setMedicToTrue = ()=>{
    setValues({...values, priseMedicamentActuelle: true})
  }
  const setMedicToFalse = ()=>{
    setValues({...values, priseMedicamentActuelle: false})
  }

  return (
    <View style={{marginTop:20}}>
      <Text style={styles.label}>
        Avez-vous déjà eu un saignement anormal au cours d’une intervention ou d’un accident ? 
      </Text>
      <RadioComponent 
        valueState={values.saignementInterventionAccident} 
        setValueToTrue = {setSaignementToTrue} 
        setValueToFalse = {setSaignementToFalse}
      />
      <Text style={styles.label}>
        Avez-vous subi un traitement par radiations ? 
      </Text>
      <RadioComponent 
        valueState={values.traitementRadiations} 
        setValueToTrue = {setRadiationsToTrue} 
        setValueToFalse = {setRadiationsToFalse}
      />
      <Text style={styles.label}>
        Prenez-vous des médicaments en ce moment ? 
      </Text>
      <RadioComponent 
        valueState={values.priseMedicamentActuelle} 
        setValueToTrue = {setMedicToTrue} 
        setValueToFalse = {setMedicToFalse}
      />
      {
        values.priseMedicamentActuelle &&
        <View style={{marginTop:-25, flexDirection:"row", alignItems:"center"}}>
          <Text style={styles.label}>
            Si oui, lesquels ? :
          </Text>
          <TextInput
            style={styles.input}
          />
          <TouchableOpacity style={{backgroundColor:"#3798e8", height:30, paddingHorizontal:7.5}} >
            <Text style={{color:"#fff", fontSize:20}}>AJOUTER</Text>
          </TouchableOpacity>
        </View>
      }
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
  input : {
    width:200, 
    height:30,
    fontSize:20, 
    padding:5, 
    marginLeft:5, 
    borderWidth:2
  }
});
