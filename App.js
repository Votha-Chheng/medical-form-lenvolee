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
import { useEffect, useState } from 'react';
import MedicalForm from './components/MedicalForm';
import DiseasesCheckboxes from './components/DiseasesCheckboxes';
import OtherDiseases from './components/OtherDiseases';
import MedicalFormSecond from './components/MedicalFormSecond';
import ExamensDentaires from './components/ExamensDentaires';
import Gencives from './components/Gencives';
import Dents from './components/Dents';
import Machoire from './components/Machoire';
import HygieneDentaire from './components/HygieneDentaire';
import Habitudes from './components/Habitudes';
import Esthetique from './components/Esthetique';
import Divers from './components/Divers';


export default function App() {

  const [focusedColor, setFocusedColor] = useState("#000000")
  const [values, setValues] = useState({
    dr:"",
    dateRdv : "",
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
    dateDernierExamen:"",
    changementEtatSante:"",
    maladies:[],
    saignementInterventionAccident:false,
    traitementRadiations:false,
    priseMedicamentActuelle:false,
    medicamentsActuels:[],
    allergies : false,
    allergiesListe:[],
    fumeur:false,
    cigarettesParJour:"",
    enceinte :false,
    moisDeGrossesse:"",
    pilule:false,
    osteoporose:false,
    medicOsteoporose :[],
    dateDernierExamDentaire:"",
    motifConsultation:"",
    difficulteDentiste:false,
    listeDifficulteDentiste:[],
    //Gencives
    dentsEcartes:false,
    saignementGencive:false,
    traitementGencive:false,
    traitementGencivesPar:[],
    //Dents
    dentsExtraites:false,
    causesExtraction : [],
    dentsRemplacees:undefined,
    moyenDentRemplacement : [],
    raisonsNonRemplacementDentsExtraites : [],
    sensationProthesesActuelles:undefined,
    utilisationMetaux:undefined,
    preferencesUtilisationMetaux:[],
    dentsSensibles:undefined,
    listeSensibilite : [],
    //Mâchoires
    serrementGrincementDents:undefined,
    craquementClaquementDouleurOuvertureMachoire:undefined,
    difficulteAvalerMacherCoteUnique:undefined,
    //Hygiène dentaire
    typeBrosseADent:[],
    momentsBrossageDents:[],
    rythmeChangementBrosseAdent:undefined,
    utilisationFilDentaireBrossette:undefined,
    //Habitudes
    habitudes:[],
    mauvaiseHaleine : undefined,
    //Dentisterie esthétique
    dentsMemeCouleurs:undefined,
    souhaitDentsPlusBlanches:undefined,
    satisfactionDentsGencives: undefined,
    mainDevantBoucheSourire:undefined,
    souhaitsChangementOuiNon:undefined,
    souhaitsChangement:"",
    //Divers
    appareilDentaireUneFois:undefined,
    preoccupationDentsOuiNon:undefined,
    preoccupationDents:"",
    modifierDentsOuiNon:undefined,
    modifierDents:"",
    anxieuxSoinsDentaires:undefined,
    commentConnaissezVousLeCabinet:"",
    autresRemarquesUtilesOuiNon:undefined,
    autresRemarquesUtiles:""
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

  useEffect(()=>{
    console.log(values.anxieuxSoinsDentaires)
  },[values.anxieuxSoinsDentaires])

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
      <Titles title="Historique dentaire" />  
      <ExamensDentaires values={values} setValues={setValues} focusedColor={focusedColor} focusBorderColor={focusBorderColor} blurBorderColor={blurBorderColor}/>
      <Gencives values={values} setValues={setValues}/>
      <Dents values={values} setValues={setValues}/>
      <Machoire values={values} setValues={setValues}/>
      <HygieneDentaire values={values} setValues={setValues} />
      <Habitudes values={values} setValues={setValues} />
      <Esthetique values={values} setValues={setValues} />
      <Divers values={values} setValues={setValues}/>
      <Titles title="Valider les réponses du questionnaire"/>
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
