import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SubTitles from './SubTitles';
import RadioComponent from './RadioComponent';
import CheckBoxComponent from './CheckBoxComponent';
import { globalStyles } from '../globalStyles';

const Gencives = ({values, setValues}) => {

  const {dentsEcartes, saignementGencive, traitementGencive, traitementGencivesPar} = values

  const setValueToTrue = (keyName)=>{
    setValues({...values, [keyName]: true})
  }
  const setValueToFalse = (keyName, nextKey, isArray, arrayState)=>{
    if(isArray){
      arrayState = []
    }
    setValues({...values, [keyName]: false, [nextKey]:`${isArray? []: null}`})
  }

  const addRadioTypesTraitement = (isChecked, nameTraitement)=>{
    if(isChecked){
      setValues({...values, traitementGencivesPar: [...traitementGencivesPar, nameTraitement]})
    } else if(!isChecked){
      let tempState = traitementGencivesPar.filter(traitement => traitement !== nameTraitement)
        setValues({...values, traitementGencivesPar: tempState})
    }
  }

  return (
    <View style={{marginLeft:5}}>
      <SubTitles title="GENCIVES" />
      <View>
        <Text style={globalStyles.label}>
          &#8227; Avez-vous remarqué que vos dents se sont écartées depuis quelque temps ?
        </Text>
        <RadioComponent
          valueState={dentsEcartes} 
          setValueToTrue = {()=>setValueToTrue("dentsEcartes")} 
          setValueToFalse = {()=>setValueToFalse("dentsEcartes")}
        />
      </View>
      <View>
        <Text style={globalStyles.label}>
          &#8227; Vos gencives saignent-elles après le brossage, voire spontanément ?
        </Text>
        <RadioComponent
          valueState={saignementGencive} 
          setValueToTrue = {()=>setValueToTrue("saignementGencive")} 
          setValueToFalse = {()=>setValueToFalse("saignementGencive")}
        />
      </View>
      <View style={{marginBottom:5}}>
        <Text style={globalStyles.label}>
          &#8227; Avez-vous déjà été traité(e) pour les gencives ?
        </Text>
        <RadioComponent
          valueState={traitementGencive} 
          setValueToTrue = {()=>setValueToTrue("traitementGencive")} 
          setValueToFalse = {()=>setValueToFalse("traitementGencive", "traitementGencivesPar", true, traitementGencivesPar)}
        />
        {
          traitementGencive &&
          <View style={{marginTop:-25}}>
            <Text style={globalStyles.label}>
              Le(s) traitement(s) a/ont été effectué(s) par :
            </Text>
            <View style={{marginHorizontal:25}}>
              <CheckBoxComponent title="Chirurgie" maladies={traitementGencivesPar} handleChangeValues={addRadioTypesTraitement}/>
              <CheckBoxComponent title="Médicaments" maladies={traitementGencivesPar} handleChangeValues={addRadioTypesTraitement}/>
              <CheckBoxComponent title="Détartrage" maladies={traitementGencivesPar} handleChangeValues={addRadioTypesTraitement}/>
            </View>
          </View>
        }
      </View>
    </View>
  );
};

export default Gencives;

