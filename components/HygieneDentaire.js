import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import SubTitles from './SubTitles';
import CheckBoxComponent from './CheckBoxComponent';
import { globalStyles } from '../globalStyles';
import MultipleRadioComponent from './MultipleRadioComponent';
import RadioComponent from './RadioComponent';

const HygieneDentaire = ({values, setValues}) => {

  const {
    typeBrosseADent,
    momentsBrossageDents,
    rythmeChangementBrosseAdent,
    utilisationFilDentaireBrossette
  } = values

  const changeTypeBrosseAdent = (isChecked, type)=>{
    if(isChecked){
      setValues({...values, typeBrosseADent: [...typeBrosseADent, type]})
    } else if(!isChecked){
      let tempState = typeBrosseADent.filter(item => item !== type)
        setValues({...values, typeBrosseADent: tempState})
    }
  }
  const changeMomentBrossage = (isChecked, moment)=>{
    if(isChecked){
      setValues({...values, momentsBrossageDents: [...momentsBrossageDents, moment]})
    } else if(!isChecked){
      let tempState = momentsBrossageDents.filter(item => item !== moment)
        setValues({...values, momentsBrossageDents: tempState})
    }
  }
  const changeRythmeBrosseADent = (value)=>{
    setValues({...values, rythmeChangementBrosseAdent: value})
  }

  const setUtilisationToTrue = ()=>{
    setValues({...values, utilisationFilDentaireBrossette: true})
  }
  const setUtilisationToFalse = (keyName)=>{
    setValues({...values, utilisationFilDentaireBrossette: false})
  }

  return (
    <View style={globalStyles.container}>
      <SubTitles title="HYGIÈNE DENTAIRE" />
      <View style={{marginTop:10}}>
        <Text style={[globalStyles.label, {color:`${typeBrosseADent.length<1? "red": "black"}`}]}>
          &#8227; Quel type de brosse à dent utilisez-vous ?
        </Text>
        <CheckBoxComponent title="Dure" maladies={typeBrosseADent} handleChangeValues={changeTypeBrosseAdent}/>
        <CheckBoxComponent title="Medium" maladies={typeBrosseADent} handleChangeValues={changeTypeBrosseAdent}/>
        <CheckBoxComponent title="Souple" maladies={typeBrosseADent} handleChangeValues={changeTypeBrosseAdent}/>
      </View>
      <View style={{marginTop:10}}>
        <Text style={[globalStyles.label, {color:`${momentsBrossageDents.length<1? "red": "black"}`}]}>
          &#8227; À quel(s) moment(s) de la journée vous brossez-vous les dents ? :  
        </Text>
        <CheckBoxComponent title="Matin" maladies={momentsBrossageDents} handleChangeValues={changeMomentBrossage}/>
        <CheckBoxComponent title="Midi" maladies={momentsBrossageDents} handleChangeValues={changeMomentBrossage}/>
        <CheckBoxComponent title="Soir" maladies={momentsBrossageDents} handleChangeValues={changeMomentBrossage}/>
      </View>
      <View style={{marginTop:25}}>
        <Text style={[globalStyles.label, {color:`${rythmeChangementBrosseAdent === undefined ? "red": "black"}`}]}>
          &#8227; À quel rythme changez-vous de brosse à dents environ ? :
        </Text>
        <View>
          <MultipleRadioComponent
            arrayChoix = {["Plus d'une fois par semaine", "Une fois par semaine", "Une à deux fois par mois", "Une à deux fois tous les 3 mois", "Au-delà de 3 mois"]} 
            valueState = {rythmeChangementBrosseAdent}
            handleOnPress = {changeRythmeBrosseADent}
          />
        </View>
      </View>
      <View style={{marginTop:25}}>
        <Text style={[globalStyles.label, {color:`${utilisationFilDentaireBrossette === undefined ? "red": "black"}`}]}>
          &#8227; Utilisez-vous le fil de soie dentaire ou les brossettes inter-dentaires ?
        </Text>
        <RadioComponent
          valueState ={utilisationFilDentaireBrossette}
          setValueToTrue={setUtilisationToTrue}
          setValueToFalse={setUtilisationToFalse}
        />
      </View>
    </View>
  );
};

export default HygieneDentaire;

const styles = StyleSheet.create({});
