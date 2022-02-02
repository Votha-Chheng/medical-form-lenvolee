import AppLoading from 'expo-app-loading';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Logo from './components/Logo';
import Titles from './components/Titles';
import { 
  FrankRuhlLibre_300Light,
  FrankRuhlLibre_400Regular,
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_700Bold,
  FrankRuhlLibre_900Black 
} from '@expo-google-fonts/frank-ruhl-libre';
import { 
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold 
} from '@expo-google-fonts/oswald'
import { useFonts } from 'expo-font';
import IdentityForm from './components/IdentityForm';
import { useState } from 'react';
import MedicalForm from './components/MedicalForm';
import DiseasesCheckboxes from './components/DiseasesCheckboxes';
import OtherDiseases from './components/OtherDiseases';
import MedicalFormSecond from './components/MedicalFormSecond';


export default function App() {

  const [focusedColor, setFocusedColor] = useState("#000000")
  const [values, setValues] = useState({
    dr:"",
    dateRdv : new Date().toLocaleString(),
    genre : "Madame",
    nom : "",
    prenom:"",
    dateDeNaissance:"",
    tel:"",
    email:"",
    profession:"",
    adresse:"",
    codePostal:"",
    ville:"",
    medecinTraitant : "",
    dateDernierExamen:new Date(),
    changementEtatSante:"",
    maladies:[],
    extraMaladies:[],
    saignementInterventionAccident:false,
    traitementRadiations:false,
    priseMedicamentActuelle:false,
    medicamentsActuels:[],
    allergieMedicaments:[],
    fumeur:"",
    cigarettesParJour:"",
    enceinte :"",
    pilule:"",
    osteoporose:"",
    medicOsteoporose:"",
    dateDernierExamDentaire:"",
    motifConsultation:"",
    difficulteDentiste:"",
    listeDifficulteDentiste:"",
  })

  let [fontsLoaded, error] = useFonts({
    FrankRuhlLibre_300Light,
    FrankRuhlLibre_400Regular,
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_700Bold,
    FrankRuhlLibre_900Black,
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold 
  })

  const focusBorderColor = ()=>{
    setFocusedColor("#05bc1b")
  }
  const blurBorderColor = ()=>{
    setFocusedColor("#4f4d4b")
  }

  if(!fontsLoaded){
    return (
      <AppLoading />
    )
  }

  console.log(values.saignementInterventionAccident)
  console.log(values.traitementRadiations)
  console.log(values.priseMedicamentActuelle)

  return (
    <ScrollView style={styles.container}>
      <Logo/>
      <Titles title="Questionnaire médical" />
      <Text style={styles.texte}>
        Afin de vous soigner en toute sécurité, un historique détaillé de votre état de santé générale et dentaire est de la plus grande importance. C’est pourquoi nous vous remercions de répondre avec soin aux questions suivantes. Ces informations resteront strictement confidentielles. Par ailleurs, nous discuterons ensemble de cet historique en détails. 
      </Text>
      <Text style={styles.texteMiddle}>
        N’hésitez pas à vous adresser à mon assistante ou à moi-même pour vous aider à le remplir.
      </Text>
      <Titles title="Votre dentité" />
      <IdentityForm values={values} setValues={setValues}/>
      <Titles title="Historique médical" />
      <MedicalForm values={values} setValues={setValues} focusedColor={focusedColor} focusBorderColor={focusBorderColor} blurBorderColor={blurBorderColor} />
      <DiseasesCheckboxes values={values} setValues={setValues}/>
      <OtherDiseases values={values} setValues={setValues} focusedColor={focusedColor} focusBorderColor={focusBorderColor} blurBorderColor={blurBorderColor}/>
      <MedicalFormSecond values={values} setValues={setValues} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  texte: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    letterSpacing : 1.25,
    fontSize:17,
    textAlign:"justify",
    lineHeight : 25
  },
  texteMiddle: {
    paddingBottom: 10,
    paddingTop:0,
    paddingHorizontal: 25,
    letterSpacing : 1.25,
    fontSize:17,
    textAlign:"justify",
    lineHeight : 25
  },
});
