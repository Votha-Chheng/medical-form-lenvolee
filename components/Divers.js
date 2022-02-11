import { StyleSheet, View } from 'react-native';
import React from 'react';
import SubTitles from './SubTitles';
import { globalStyles } from '../globalStyles';
import Label from './Label';
import RadioComponent from './RadioComponent';
import MultipleRadioComponent from './MultipleRadioComponent';
import TextAreatAjouter from './TextAreatAjouter';

const Divers = ({values, setValues}) => {

  const {
    appareilDentaireUneFois,
    preoccupationDentsOuiNon,
    preoccupationDents,
    modifierDentsOuiNon,
    modifierDents,
    anxieuxSoinsDentaires,
    commentConnaissezVousLeCabinet,
    autresRemarquesUtilesOuiNon,
    autresRemarquesUtiles
  } = values

  const setValueToTrue = (keyName)=>{
    setValues({...values, [keyName]:true})
  }
  const setValueToFalse = (keyName, secondKeyName)=>{
    setValues({...values, [keyName]:false, [secondKeyName]:""})
  }

  const changeAnxieuxSoins = (value)=>{
    setValues({...values, anxieuxSoinsDentaires: value})
  }

  return (
    <View style={globalStyles.container, {marginTop:10, marginLeft:5}}>
      <SubTitles title="DIVERS"/>
      <View>
        <Label
          question="Avez-vous porté un appareil ou des bagues pour redresser vos dents ?"
          statement={appareilDentaireUneFois}
        />
        <RadioComponent
          valueState={appareilDentaireUneFois}
          setValueToTrue={()=>setValueToTrue("appareilDentaireUneFois")}
          setValueToFalse={()=>setValueToFalse("appareilDentaireUneFois")}
        />
        
      </View>
      <View style={{marginBottom:50}}>
        <TextAreatAjouter
          values={values}
          setValues={setValues}
          questionOuiNon="Avez-vous des préoccuppations particulières convernant vos dents ?"
          questionDescription="Décrivez ces préoccupations "
          inputPlaceholder="Décrivez ici ces préocuppations"
          stateOuiNon={preoccupationDentsOuiNon}
          stateOuiNonToString ="preoccupationDentsOuiNon"
          stateNext = {preoccupationDents}
          stateNextToString = "preoccupationDents"
        />
      </View>
      
      <View style={{marginBottom:50}}>
        <TextAreatAjouter
          values={values}
          setValues={setValues}
          questionOuiNon="Idéalement, aimeriez-vous modifier quelque chose dans votre bouche ?"
          questionDescription="Quelles modifications aimeriez-vous apporter dans votre bouche ?"
          inputPlaceholder="Décrivez ici modifications..."
          stateOuiNon={modifierDentsOuiNon}
          stateOuiNonToString ="modifierDentsOuiNon"
          stateNext = {modifierDents}
          stateNextToString = "modifierDents"
        />
      </View>

      <View style={{marginBottom:50}}>
        <Label
          question="Etes-vous anxieuse/anxieux à l’idée de réaliser des soins dentaires ?"
          statement={anxieuxSoinsDentaires}
        />
        <MultipleRadioComponent
          arrayChoix = {["Pas du tout", "Un peu", "Moyennement ", "Beaucoup"]} 
          valueState = {anxieuxSoinsDentaires}
          handleOnPress = {changeAnxieuxSoins}
        />
      </View>
      <View style={{marginBottom:50}}>
        <TextAreatAjouter
          values={values}
          setValues={setValues}
          questionDescription="Comment avez-vous connu le cabinet ?"
          inputPlaceholder="Décrivez ici par quel(s) moyen(s) vous avez connu ce cabinet..."
          stateNext = {commentConnaissezVousLeCabinet}
          stateNextToString = "commentConnaissezVousLeCabinet"
          unconditional={true}
        />
      </View>
      <View style={{marginBottom:50}}>
        <TextAreatAjouter
          values={values}
          setValues={setValues}
          questionOuiNon="Avez-vous des remarques utiles à nous faire passer ?"
          questionDescription="Quelles sont ces remarques ?"
          inputPlaceholder="Décrivez ici vos remarques..."
          stateOuiNon={autresRemarquesUtilesOuiNon}
          stateOuiNonToString ="autresRemarquesUtilesOuiNon"
          stateNext = {autresRemarquesUtiles}
          stateNextToString = "autresRemarquesUtiles"
        />
      </View>  
    </View>
  );
};

export default Divers;
