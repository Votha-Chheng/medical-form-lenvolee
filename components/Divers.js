import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SubTitles from './SubTitles';
import { globalStyles } from '../globalStyles';
import Label from './Label';
import RadioComponent from './RadioComponent';
import TextAreaInput from './TextAreaInput';
import MultipleRadioComponent from './MultipleRadioComponent';

const Divers = ({values, setValues}) => {

  const [connaissanceCabinetInput, setConnaissanceCabinetInput] = useState("")
  const [modifier, setModofier] = useState(false)

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
      <View>
        <Label
          question="Avez-vous des préoccuppations particulières convernant vos dents ?"
          statement={preoccupationDentsOuiNon}
        />
        <RadioComponent
          valueState={preoccupationDentsOuiNon}
          setValueToTrue={()=>setValueToTrue("preoccupationDentsOuiNon")}
          setValueToFalse={()=>setValueToFalse("preoccupationDentsOuiNon", "preoccupationDents")}
        />
        <TextAreaInput
          values={values}
          setValues={setValues}
          question="Décrivez ces préoccupations :"
          textState = {preoccupationDents}
          ouiNonState ={preoccupationDentsOuiNon}
          keyName="preoccupationDents"
        />
      </View>
      <View>
        <Label
          question="Idéalement, aimeriez-vous modifier quelque chose dans votre bouche ?"
          statement={modifierDentsOuiNon}
        />
        <RadioComponent
          valueState={modifierDentsOuiNon}
          setValueToTrue={()=>setValueToTrue("modifierDentsOuiNon")}
          setValueToFalse={()=>setValueToFalse("modifierDentsOuiNon", "modifierDents")}
        />
        <TextAreaInput
          values={values}
          setValues={setValues}
          question="Décrivez ce que vous aimeriez  modifier :"
          textState = {modifierDents}
          ouiNonState ={modifierDentsOuiNon}
          keyName="modifierDents"
        />
      </View>
      <View style={{marginTop:25}}>
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
      <View style={{marginTop:25}}>
        <TextAreaInput
          values={values}
          setValues={setValues}
          question="Comment avez-vous connu le cabinet ?"
          textState = {commentConnaissezVousLeCabinet}
          ouiNonState = "nonConditional"
          keyName="commentConnaissezVousLeCabinet"
        />
      </View>
      <View style={{marginTop:25}}>
        <Label
          question="Avez-vous des remarques utiles à nous faire passer ?"
          statement={autresRemarquesUtilesOuiNon}
        />
        <RadioComponent
          valueState={autresRemarquesUtilesOuiNon}
          setValueToTrue={()=>setValueToTrue("autresRemarquesUtilesOuiNon")}
          setValueToFalse={()=>setValueToFalse("autresRemarquesUtilesOuiNon", "autresRemarquesUtiles")}
        />
        <TextAreaInput
          values={values}
          setValues={setValues}
          question="Quelles sont ces remarques ?"
          textState = {autresRemarquesUtiles}
          ouiNonState ={autresRemarquesUtilesOuiNon}
          keyName="autresRemarquesUtiles"
        />
      </View>
      
    </View>
  );
};

export default Divers;

const styles = StyleSheet.create({});
