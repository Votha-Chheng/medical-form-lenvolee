import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import RadioComponent from './RadioComponent';
import { globalStyles } from '../globalStyles';
import Label from './Label';


const HabitudesCheckBoxes = ({
  // arrayState, values, keyName, setValues
  arrayState, values, setValues
}) => {


  const [sucerPouce, setSucerPouce] = useState(undefined)
  const [mordre, setMordre] = useState(undefined)
  const [instrument, setInstrument] = useState(undefined)
  const [rongerOngle, setRongerOngle] = useState(undefined)
  const [macher, setMacher] = useState(undefined)

  const handleSetToTrue = (setter, valueHabit)=>{
    setter(true)
    setValues({...values, habitudes : [...arrayState, valueHabit]})
  }
  const handleSetToFalse = (setter, valueHabit)=>{
    setter(false)
    let temp = arrayState.filter(item=> item!==valueHabit)
    setValues({...values, habitudes : temp})
  }

  return (
    <View>
      <Label 
        question="Avez-vous eu par le passé ou avez-vous maintenant l’une des habitudes suivantes ?"
        statement={[sucerPouce, mordre, instrument, rongerOngle, macher]}
        isArray={true}
        conditional = {true}
      />
      <View style={[globalStyles.flexRow, styles.radioComponent]}>
        <Text style={[globalStyles.label, {color:`${sucerPouce===undefined ? "red": "black"}`}]}>
          Sucer son pouce
        </Text>
        <View style={{marginTop:30}}>
          <RadioComponent
            valueState ={sucerPouce}
            setValueToTrue={()=>handleSetToTrue(setSucerPouce, "Sucer son pouce")}
            setValueToFalse={()=>handleSetToFalse(setSucerPouce, "Sucer son pouce")}
          />
        </View>
      </View>
      <View style={[globalStyles.flexRow, styles.radioComponent, {marginTop:-80}]}>
        <Text style={[globalStyles.label, {color:`${mordre===undefined ? "red": "black"}`}]}>
          Se mordre la langue, la lèvre ou la joue   
        </Text>
        <View style={{marginTop:30}}>
          <RadioComponent
            valueState ={mordre}
            setValueToTrue={()=>handleSetToTrue(setMordre, "Se mordre la langue, la lèvre ou la joue")}
            setValueToFalse={()=>handleSetToFalse(setMordre, "Se mordre la langue, la lèvre ou la joue")}
          />
        </View>
      </View>  
      <View style={[globalStyles.flexRow, styles.radioComponent, {marginTop:-80}]}>
        <Text style={[globalStyles.label, {color:`${instrument===undefined ? "red": "black"}`}]}>
          Jouer d’un instrument musical à vent
        </Text>
        <View style={{marginTop:30}}>
          <RadioComponent
            valueState ={instrument}
            setValueToTrue={()=>handleSetToTrue(setInstrument, "Jouer d’un instrument musical à vent")}
            setValueToFalse={()=>handleSetToFalse(setInstrument, "Jouer d’un instrument musical à vent")}
          />
        </View>
      </View>  
      <View style={[globalStyles.flexRow, styles.radioComponent, {marginTop:-80}]}>
        <Text style={[globalStyles.label, {color:`${rongerOngle===undefined ? "red": "black"}`}]}>
          Se ronger les ongles
        </Text>
        <View style={{marginTop:30}}>
          <RadioComponent
            valueState ={rongerOngle}
            setValueToTrue={()=>handleSetToTrue(setRongerOngle, "Se ronger les ongles")}
            setValueToFalse={()=>handleSetToFalse(setRongerOngle, "Se ronger les ongles")}
          />
        </View>
      </View>  
      <View style={[globalStyles.flexRow, styles.radioComponent, {marginTop:-80}]}>
        <Text style={[globalStyles.label, {color:`${macher===undefined ? "red": "black"}`}]}>
          Mâcher un crayon, vos lunettes ou un stylo
        </Text>
        <View style={{marginTop:30}}>
          <RadioComponent
            valueState ={macher}
            setValueToTrue={()=>handleSetToTrue(setMacher, "Mâcher un crayon, vos lunettes ou un stylo")}
            setValueToFalse={()=>handleSetToFalse(setMacher, "Mâcher un crayon, vos lunettes ou un stylo")}
          />
        </View>
      </View>  
    </View>
  )
};

export default HabitudesCheckBoxes;

const styles = StyleSheet.create({
  radioComponent: {
    marginTop:-30, 
    marginLeft:20
  }
});
