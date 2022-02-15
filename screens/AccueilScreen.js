import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { useValuesContext } from '../providers/ValuesProvider'
import { globalStyles } from '../globalStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AccueilScreen = ({navigation}) => {
  const [locked, setLocked] = useState(true)
  const [motDePasseInput, setMotdePasseInput] = useState(true)

  const {resetValues} = useValuesContext()

  
  useEffect(()=>{
    if(motDePasseInput==="123456789"){
      setLocked(false)
    }
  }, [motDePasseInput])
  
  
  useEffect(()=>{
    navigation.addListener("blur", (event)=>{
      setLocked(true)
    })
  }, [navigation])
  
  const handleGetAccess = (input)=>{
    if(input===123456789){
      setLocked(false)
    }
  }
  
  const pressNouveauPatient = ()=>{
    resetValues()
    navigation.navigate("Questionnaire médical")
  }

  const pressToListePatients = ()=>{
    navigation.navigate("Liste fiches patients")
  }

  const createTwoButtonAlert = () => {
    Alert.alert(
      "Suppression de la liste des fiches patients",
      "Êtes-vous sûr de vouloir supprimer ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        { 
          text: "Supprimer la liste", 
          onPress: ()=>{AsyncStorage.removeItem("Patientèle")}
        }
      ]
    );
  }
    

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:"center"}}>

      {
        locked ?
        <View style={{alignItems:"center"}}>
          <Text style={[globalStyles.label, {color:"black"}]} >
            Tapez le mot de passe :
          </Text>
          <TextInput
            style={[globalStyles.input, {width:650}]}
            onChangeText={(text)=>setMotdePasseInput(text)}
            secureTextEntry={true}
          />
          <Button
            style={{backgroundColor:"red", width:600, height:50, marginVertical:20}}
            labelStyle={{fontSize:20, flex:1, color:"#fff", justifyContent:"center", paddingHorizontal:0}}
            onPress={()=>handleGetAccess(motDePasseInput)}
          >
            Valider mot de passe
          </Button>
        </View>
        :
        <View>
          <Text style={[styles.text, {marginBottom:50, textAlign:'center'}]}>Accueil</Text>
          <Button
            mode="contained"
            onPress={pressNouveauPatient}
            style={{backgroundColor:"green", width:600, height:50, marginBottom:50}}
            labelStyle={{fontSize:20, flex:1, justifyContent:"center", paddingHorizontal:0}}
          >
            Questionnaire Nouveau patient
          </Button>
          <View>
            <Button
              mode='contained'
              dark={true}
              onPress={pressToListePatients}
              style={{backgroundColor:"orange", width:600, height:50, marginBottom:50}}
              labelStyle={{fontSize:17, flex:1, justifyContent:"center", paddingHorizontal:0}}
            >
              Exporter les fiches patients
            </Button>
          </View>
          <View>
            <Button
              mode='contained'
              dark={true}
              onPress={createTwoButtonAlert}
              style={{backgroundColor:"red", width:600, height:50}}
              labelStyle={{fontSize:17, flex:1, justifyContent:"center", paddingHorizontal:0}}
            >
              Supprimer les précédentes listes de patients
            </Button>
          </View>
        </View>
      }  
    </View>
  )
}

export default AccueilScreen

const styles = StyleSheet.create({
  text:{
    color:"black",
    fontSize:50,
    fontFamily:"FrankRuhlLibre_900Black"
  }
})