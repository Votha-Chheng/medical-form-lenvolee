import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { globalStyles } from '../globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValuesContext } from '../providers/ValuesProvider';

const ValidationQuestionnaire = ({navigation}) => {

  const [valid, setValid] = useState(false)
  const [questionsRestantes, setQuestionsRestantes] = useState(0)

  const {values} = useValuesContext()


  useEffect(()=>{
    gestionValidation()

  }, [values, valid])

  useEffect(()=>{
    let temp = 0
    for (let value in values){
      if(values[value]===undefined){
        temp++
      }  
    }
    setQuestionsRestantes(temp)
  }, [values, questionsRestantes])

  const gestionValidation = ()=>{
    let temp = []
    for(let value in values) {
      temp = [...temp, values[value]]
    }

    if(temp.includes(undefined)){
      setValid(false)

    } else {
      setValid(true)

    }
  }

  const searchPatienteleInAsyncStorage = async()=>{
    try{

      const arrayPatienteleJSON = await AsyncStorage.getItem('Patientèle')

      if(arrayPatienteleJSON!==null){
        return arrayPatienteleJSON
      } else {
        return null
      }
      
    } catch (error){
      console.log(error)
    }
    
  }

  const saveAsyncStorageInJSON = async ()=>{
    try {
      const resultPatientele = await searchPatienteleInAsyncStorage()

      if(resultPatientele!==null){
        const arrayPatientele = JSON.parse(resultPatientele)
      
        const newArray = [...arrayPatientele, values]

        const newArrayToJSON = JSON.stringify(newArray)

        await AsyncStorage.setItem("Patientèle", newArrayToJSON)

        navigation.navigate("Merci")
        
        return

      } else {

        const newArrayPatientele = [values]

        const newArrayToJSON = JSON.stringify(newArrayPatientele)

        await AsyncStorage.setItem("Patientèle", newArrayToJSON)

        navigation.navigate("Merci")

        return
      }
    } catch(error){
      console.log(error)
      return

    }
  }

  return (
    <View style={[globalStyles.container, {alignItems:"center", marginVertical:30}]}>
      {
        !valid ?
        <View style={[globalStyles.flexRow, {flexWrap:"wrap", justifyContent:"center"}]}>
          <Text style={[globalStyles.label, {marginBottom:-10}]}>
            Il reste encore
          </Text>
          <Text style={[globalStyles.label, {color:"red", marginBottom:-10}]}>
            {questionsRestantes.toString()} questions en rouge.
          </Text>
          <Text style={[globalStyles.label, {textAlign:"center"}]}>
            Veuillez s'il vous plaît remonter à ces questions pour y répondre.
          </Text>
        </View>
        :
        <View style={[globalStyles.flexRow, {flexWrap:"wrap", justifyContent:"center"}]}>
          <Text style={[globalStyles.label, {marginBottom:-10}]}>
            Vous pouvez maintenant valider le questionnaire.
          </Text>
        </View>
      }
      <Button
        mode='contained'
        dark={true}
        onPress={saveAsyncStorageInJSON}
        style={{backgroundColor:`${valid ? "green":"grey"}`, width:600, height:50}}
        labelStyle={{fontSize:17, flex:1, justifyContent:"center", paddingHorizontal:0, color:"#fff"}}
        disabled={!valid}
      >
        {
          !valid ? "Finissez le questionnaire pour valider" : "Appuyer ici pour valider le questionnaire"
        }
      </Button>
    </View>
  );
};

export default ValidationQuestionnaire;

