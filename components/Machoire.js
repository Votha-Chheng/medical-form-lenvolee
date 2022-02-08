import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../globalStyles';
import SubTitles from './SubTitles';
import RadioComponent from './RadioComponent';

const Machoire = ({values, setValues}) => {

  const {
    serrementGrincementDents,
    craquementClaquementDouleurOuvertureMachoire,
    difficulteAvalerMacherCoteUnique
  } = values

  const setValueToTrue = (keyName)=>{
    setValues({...values, [keyName]: true})
  }
  const setValueToFalse = (keyName)=>{
    setValues({...values, [keyName]: false})
  }

  return (
    <View style={globalStyles.container}>
      <SubTitles title="MÂCHOIRES" />
      <View>
        <Text style={[globalStyles.label, {color:`${serrementGrincementDents===undefined ? "red":"black"}`, marginTop:10}]} >
          &#8227; Serrez-vous ou grincez-vous des dents ?
        </Text>
        <RadioComponent
          valueState ={serrementGrincementDents}
          setValueToTrue={()=>setValueToTrue("serrementGrincementDents")}
          setValueToFalse={()=>setValueToFalse("serrementGrincementDents")}
        />
        <Text style={[globalStyles.label, {color:`${craquementClaquementDouleurOuvertureMachoire===undefined ? "red":"black"}`, marginTop:10}]} >
          &#8227; Avez-vous remarqué des craquements, des claquements ou une douleur à l’ouverture de la mâchoire ?      
        </Text>
        <RadioComponent
          valueState ={craquementClaquementDouleurOuvertureMachoire}
          setValueToTrue={()=>setValueToTrue("craquementClaquementDouleurOuvertureMachoire")}
          setValueToFalse={()=>setValueToFalse("craquementClaquementDouleurOuvertureMachoire")}
        />
        <Text style={[globalStyles.label, {color:`${difficulteAvalerMacherCoteUnique===undefined ? "red":"black"}`, marginTop:10}]} >
          &#8227; Avez-vous des difficultés à avaler, à mâcher ou ne mâchez-vous fréquemment que d’un seul côté ?     

        </Text>
        <RadioComponent
          valueState ={difficulteAvalerMacherCoteUnique}
          setValueToTrue={()=>setValueToTrue("difficulteAvalerMacherCoteUnique")}
          setValueToFalse={()=>setValueToFalse("difficulteAvalerMacherCoteUnique")}
        />
      </View>
    </View>
  );
};

export default Machoire;

const styles = StyleSheet.create({});
