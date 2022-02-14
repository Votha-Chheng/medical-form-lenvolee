import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { globalStyles } from '../globalStyles';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValuesContext } from '../providers/ValuesProvider';

const ValidationQuestionnaire = () => {

  const [valid, setValid] = useState(false)
  const [getAsyncStorage, setGetAsyncStorage] = useState("")

  const {values} = useValuesContext()

  const {
    nom, prenom, dateDeNaissance
  } = values

  useEffect(()=>{
    gestionValidation()

  }, [values, valid])

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

  const generatePDF = async ()=>{
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  const searchPatienteleInAsyncStorage = async()=>{
    try{

      const arrayPatienteleJSON = await AsyncStorage.getItem('Patientèle')

      if(arrayPatienteleJSON!==null){
        return arrayPatienteleJSON
      } else {
        console.log("Null")
        return null
      }
      
    } catch (error){
      console.log(error)
    }
    
  }

  const saveAsyncStorageInJSON = async ()=>{
    try {
      const resultPatientele = await searchPatienteleInAsyncStorage()

      console.log("resultPatientele : ", resultPatientele)

      if(resultPatientele!==null){
        const arrayPatientele = JSON.parse(resultPatientele)
      
        const newArray = [...arrayPatientele, values]

        const newArrayToJSON = JSON.stringify(newArray)

        const result =  await AsyncStorage.setItem("Patientèle", newArrayToJSON)

        console.log("First result : ", result)

        if(result){
          console.log("New array patientele available")
          return
          
        } else {
          console.log("Nothing to save")
          return
        }

      } else {

        try {
          const newArrayPatientele = [values]

          const newArrayToJSON = JSON.stringify(newArrayPatientele)

          await AsyncStorage.setItem("Patientèle", newArrayToJSON)

          console.log("Second result : ", JSON.stringify(newArrayPatientele))

          return

        } catch (error) {
          console.log(error)
          
        }
      }

    } catch(error){
      console.log(error)
      return
    }
  }

  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
        Date de naissance : ${values.dateDeNaissance}
      </h1>
      <img
        src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
        style="width: 90vw;" />
    </body>
  </html>
  `

  return (
    <View style={[globalStyles.container, {alignItems:"center", marginVertical:30}]}>
      {
        !valid ?
        <View style={[globalStyles.flexRow, {flexWrap:"wrap", justifyContent:"center"}]}>
          <Text style={[globalStyles.label, {marginBottom:-10}]}>
            Il reste encore
          </Text>
          <Text style={[globalStyles.label, {color:"red", marginBottom:-10}]}>
            nombre de questions rouge.
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
        onPress={generatePDF}
        style={{backgroundColor:`${valid ?"green":"#e0e0e0"}`, width:600, height:50}}
        labelStyle={{fontSize:17, flex:1, justifyContent:"center", paddingHorizontal:0}}
        //disabled={!valid}
      >
        {
          !valid ? "Finissez le questionnaire pour valider" : "Appuyer ici pour valider le questionnaire"
        }
        
      </Button>
      <Button
        mode='contained'
        dark={true}
        onPress={saveAsyncStorageInJSON}
        style={{backgroundColor:`${"green"}`, width:600, height:50}}
        labelStyle={{fontSize:17, flex:1, justifyContent:"center", paddingHorizontal:0}}
      >
        Sauvegarder
      </Button>
    </View>
  );
};

export default ValidationQuestionnaire;

