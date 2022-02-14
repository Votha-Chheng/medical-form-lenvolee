import AppLoading from 'expo-app-loading';
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
import { useEffect, useState } from 'react';
import { dateToString } from './utils';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccueilScreen from './screens/AccueilScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import MerciScreen from './screens/MerciScreen';
import ValuesProvider from './providers/ValuesProvider';
import ListFichesPatients from './screens/ListFichesPatients';

export default function App() {

//Les valeurs qui sont conditionnées ne doivent pas avoir la valeur undefined!!!

  const [values, setValues] = useState({
    dr:"Sylvie MA-Francin",
    dateRdv : dateToString(new Date().toDateString()) ,
    genre : "Madame",
    nom : undefined, //
    prenom:undefined, //
    dateDeNaissance:undefined, //
    tel:undefined, //
    email:undefined, //
    profession:undefined, //
    adresse:undefined, //
    codePostal:undefined, //
    ville:undefined, //
    medecinTraitant : undefined, //
    dateDernierExamen:undefined, //
    changementEtatSante:undefined, //
    maladies:[],
    saignementInterventionAccident:undefined, //
    traitementRadiations:undefined, //
    priseMedicamentActuelle:undefined,
    medicamentsActuels:[],
    allergies : undefined, //
    allergiesListe:[],
    fumeur:undefined, //
    cigarettesParJour:"",
    enceinte :undefined, //
    moisDeGrossesse:"",
    pilule:"",
    osteoporose:undefined, //
    medicOsteoporose :[],
    dateDernierExamDentaire:undefined, //
    motifConsultation:undefined, //
    difficulteDentiste:undefined, //
    listeDifficulteDentiste:[],
    //Gencives
    dentsEcartes:undefined, //
    saignementGencive:undefined, //
    traitementGencive:undefined, //
    traitementGencivesPar:[],
    //Dents
    dentsExtraites:undefined, //
    causesExtraction : [],
    dentsRemplacees:null,
    moyenDentRemplacement : [],
    raisonsNonRemplacementDentsExtraites : [],
    sensationProthesesActuelles:null,
    utilisationMetaux:undefined, //
    preferencesUtilisationMetaux:[],
    dentsSensibles:undefined, //
    listeSensibilite : [],
    //Mâchoires
    serrementGrincementDents:undefined, //
    craquementClaquementDouleurOuvertureMachoire:undefined, //
    difficulteAvalerMacherCoteUnique:undefined, //
    //Hygiène dentaire
    typeBrosseADent:undefined, //
    momentsBrossageDents:undefined, //
    rythmeChangementBrosseAdent:undefined, //
    utilisationFilDentaireBrossette:undefined, //
    //Habitudes
    habitudes:[],
    mauvaiseHaleine : undefined, //
    //Dentisterie esthétique
    dentsMemeCouleurs:undefined,
    souhaitDentsPlusBlanches:undefined, //
    satisfactionDentsGencives: undefined, //
    mainDevantBoucheSourire:undefined, //
    souhaitsChangementOuiNon:undefined, //
    souhaitsChangement:[],

    
    //Reprendre ici!!!
    //Divers
    appareilDentaireUneFois:undefined, //
    preoccupationDentsOuiNon:undefined, //
    preoccupationDents:"",
    modifierDentsOuiNon:undefined, //
    modifierDents:"",
    anxieuxSoinsDentaires:undefined, //
    commentConnaissezVousLeCabinet:undefined, //
    autresRemarquesUtilesOuiNon:undefined, //
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
    if(values.undefined){
      console.log("Key undefined just appeared !!!")
    } else {
      console.log("Nothing")
    }
  }, [values])

  if(!fontsLoaded){
    return (
      <AppLoading />
    )
  }

  const Stack = createNativeStackNavigator()


  return (
    <ValuesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Accueil" component={AccueilScreen}/>
          <Stack.Screen name="Questionnaire médical" options={{headerShown:false}} component={QuestionnaireScreen}/>
          <Stack.Screen name="Merci" component={MerciScreen}/>
          <Stack.Screen name="Liste fiches patients" component={ListFichesPatients}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ValuesProvider>
    
  );
}

