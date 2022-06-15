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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccueilScreen from './screens/AccueilScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import MerciScreen from './screens/MerciScreen';
import ValuesProvider from './providers/ValuesProvider';
import ListFichesPatients from './screens/ListFichesPatients';
import QuestionnaireEnfantScreen from './screens/QuestionnaireEnfantScreen';

export default function App() {

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
          <Stack.Screen name="Questionnaire enfant" options={{headerShown:false}} component={QuestionnaireEnfantScreen}/>
          <Stack.Screen name="Merci" component={MerciScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Liste fiches patients" component={ListFichesPatients}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ValuesProvider>
    
  );
}

