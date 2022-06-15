import { Text, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'
import Logo from '../components/Logo'
import Titles from '../components/Titles'
import IdentityForm from '../components/IdentityForm'
import MedicalForm from '../components/MedicalForm'
import DiseasesCheckboxes from '../components/DiseasesCheckboxes'
import OtherDiseases from '../components/OtherDiseases'
import MedicalFormSecond from '../components/MedicalFormSecond'
import ExamensDentaires from '../components/ExamensDentaires'
import Gencives from '../components/Gencives'
import DentsQuestionOne from '../components/DentsQuestionOne'
import DentsQuestionTwo from '../components/DentsQuestionTwo'
import Machoire from '../components/Machoire'
import HygieneDentaire from '../components/HygieneDentaire'
import Habitudes from '../components/Habitudes'
import Esthetique from '../components/Esthetique'
import Divers from '../components/Divers'
import ValidationQuestionnaire from '../components/ValidationQuestionnaire'
import { useValuesContext } from '../providers/ValuesProvider'
import { globalStyles } from '../globalStyles'

const QuestionnaireScreen = ({navigation}) => {

  const {values, setValues} = useValuesContext()

  useEffect(()=>{
    navigation.addListener("beforeRemove", (event)=>{

      if(event.data.action.type==="GO_BACK"){
        event.preventDefault()
        createTwoButtonAlert()
      }
    })
  }, [navigation])

  const createTwoButtonAlert = () => {
    Alert.alert(
      "Êtes-vous sûr de vouloir revenir à l'accueil ?",
      "Toutes les données rentrées seront perdues, il faudra recommencer le questionnaire.",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        { 
          text: "Revenir à l'accueil", 
          onPress: ()=>navigation.navigate("Accueil")
        }
      ]
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Logo/>
      <Titles title="Questionnaire médical" />
      <Text style={globalStyles.texte}>
        Afin de vous soigner en toute sécurité, un historique détaillé de votre état de santé générale et dentaire est de la plus grande importance. C’est pourquoi nous vous remercions de répondre avec soin aux questions suivantes. Ces informations resteront strictement confidentielles. Par ailleurs, nous discuterons ensemble de cet historique en détails. 
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
      <Titles title="Votre identité" />
      <IdentityForm values={values} setValues={setValues}/>
      <Titles title="Historique médical" />
      <MedicalForm values={values} setValues={setValues}/>
      <DiseasesCheckboxes values={values} setValues={setValues}/>
      <OtherDiseases values={values} setValues={setValues}/>
      <MedicalFormSecond values={values} setValues={setValues} />
      <Titles title="Historique dentaire" />  
      <ExamensDentaires values={values} setValues={setValues}/>
      <Gencives values={values} setValues={setValues}/>
      <DentsQuestionOne values={values} setValues={setValues}/>
      <DentsQuestionTwo values={values} setValues={setValues}/>
      <Machoire values={values} setValues={setValues}/>
      <HygieneDentaire values={values} setValues={setValues} />
      <Habitudes values={values} setValues={setValues} />
      <Esthetique values={values} setValues={setValues} />
      <Divers values={values} setValues={setValues}/>
      <Titles title="Valider les réponses du questionnaire"/>
      <ValidationQuestionnaire values={values} navigation={navigation}/>
    </ScrollView>
  )
}


export default QuestionnaireScreen