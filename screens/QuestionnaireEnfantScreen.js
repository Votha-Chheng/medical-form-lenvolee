import { StyleSheet, ScrollView, Text, View } from 'react-native'
import React from 'react'
import Logo from '../components/Logo'
import Titles from '../components/Titles'
import { globalStyles } from '../globalStyles'
import { TextInput } from 'react-native-paper'
import { useValuesContext } from '../providers/ValuesProvider'

const QuestionnaireEnfantScreen = () => {

  const {nom, setNom, prenom, setPrenom} = useValuesContext()

  const onValidateName = (text)=>{
    if(text.length<1){
      setNom(text)
    } else {
      setNom(undefined)
    }
    
  }

  const onValidatePrenom = (text)=>{
    if(text.length<1){
      setPrenom(text)
    } else {
      setPrenom(undefined)
    }
    
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Logo/>
      <Titles title="Questionnaire médical pour l'Enfant" />
      <Text style={globalStyles.texte}>
        Afin de vous soigner en toute sécurité, un historique détaillé de l'état de santé générale et dentaire est de la plus grande importance. C’est pourquoi nous vous remercions de répondre avec soin aux questions suivantes ou de le remplir pour votre enfant s'il est en incapacité de le faire. Ces informations resteront strictement confidentielles. Par ailleurs, nous discuterons ensemble de cet historique en détails. 
      </Text>
      <Text style={globalStyles.texteMiddle}>
        N’hésitez pas à vous adresser à mon assistante ou à moi-même pour vous aider à le remplir.
      </Text>
      <Text style={[globalStyles.texteMiddle, {color:"red", fontWeight:"bold", textDecorationLine:"underline", marginBottom:-10}]}>
        Attention : 
      </Text>
      <Text style={[globalStyles.texteMiddle, {color:"red", fontWeight:"bold"}]}>
        Toutes les questions surlignés en rouge demandent une réponse obligatoire.
      </Text>
      <Titles title="Informations civiles de l'enfant" />
      <TextInput 
        style={[globalStyles.input,{borderWidth:2, width:250, marginLeft:25, marginTop:5, borderColor:`${nom === undefined ? "red":"green"}`}]} 
        placeholder="Nom de famille"
        onChangeText={(text)=>onValidateName(text)}
      />
      <TextInput 
        style={[globalStyles.input, {borderWidth:2, width:250, marginTop:5, borderColor:`${prenom === undefined ? "red":"green"}`}]} 
        placeholder="Prénom"
        onChangeText={(text)=>onValidatePrenom(text)}
      />
    </ScrollView>
  )
}

export default QuestionnaireEnfantScreen

const styles = StyleSheet.create({})