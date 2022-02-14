import { View } from 'react-native';
import React from 'react';
import SubTitles from './SubTitles';
import CheckBoxComponent from './CheckBoxComponent';
import { globalStyles } from '../globalStyles';
import MultipleRadioComponent from './MultipleRadioComponent';
import RadioComponent from './RadioComponent';
import Label from './Label';
import { useValuesContext } from '../providers/ValuesProvider';

const HygieneDentaire = () => {

  const {values, setValues} = useValuesContext()
  
  const {
    typeBrosseADent,
    momentsBrossageDents,
    rythmeChangementBrosseAdent,
    utilisationFilDentaireBrossette
  } = values

  const radioIsUndefined = (isCkeckedStatus, input, stateArray, stateArrayToString)=>{
    if(isCkeckedStatus){
      let tempState = [input]
      setValues({...values, [stateArrayToString]: tempState})

    } else if(!isCkeckedStatus){
      let tempState = stateArray.filter(traitement => traitement !== input)
      setValues({...values, [stateArrayToString]: tempState})
      
    }
  }
  const radioIsDefined = (isCkeckedStatus, input, stateArray, stateArrayToString)=>{
    if(isCkeckedStatus){
      setValues({...values, [stateArrayToString]: [...stateArray, input]})

    } else if(!isCkeckedStatus){
      let tempState = stateArray.filter(traitement => traitement !== input)

      if(tempState.length<1){
        setValues({...values, [stateArrayToString]: undefined})

      } else {
        setValues({...values, [stateArrayToString]: tempState})

      }
    }
  }

  const changeTypeBrosseAdent = (isChecked, type)=>{
    if(typeBrosseADent===undefined){
      radioIsUndefined(isChecked, type, typeBrosseADent, "typeBrosseADent")

    } else {
      radioIsDefined(isChecked, type, typeBrosseADent, "typeBrosseADent")
    } 
  }


  const changeMomentBrossage = (isChecked, moment)=>{
    if(momentsBrossageDents===undefined){
      radioIsUndefined(isChecked, moment, momentsBrossageDents, "momentsBrossageDents")

    } else {
      radioIsDefined(isChecked, moment, momentsBrossageDents, "momentsBrossageDents")
    } 

  }
  const changeRythmeBrosseADent = (value)=>{
    setValues({...values, rythmeChangementBrosseAdent: value})
  }

  const setUtilisationToTrue = ()=>{
    setValues({...values, utilisationFilDentaireBrossette: true})
  }
  const setUtilisationToFalse = ()=>{
    setValues({...values, utilisationFilDentaireBrossette: false})
  }

  return (
    <View style={globalStyles.container}>
      <SubTitles title="HYGIÈNE DENTAIRE" />
      <View style={{marginVertical:20}}>
        <Label
          question="Quel type de brosse à dent utilisez-vous ?"
          statement={typeBrosseADent}
        />
        <CheckBoxComponent title="Dure" maladies={typeBrosseADent} handleChangeValues={changeTypeBrosseAdent}/>
        <CheckBoxComponent title="Medium" maladies={typeBrosseADent} handleChangeValues={changeTypeBrosseAdent}/>
        <CheckBoxComponent title="Souple" maladies={typeBrosseADent} handleChangeValues={changeTypeBrosseAdent}/>
      </View>
      <View style={{marginVertical:20}}>
        <Label
          question="À quel(s) moment(s) de la journée vous brossez-vous les dents ?"
          statement={momentsBrossageDents}
        />
        <CheckBoxComponent title="Matin" maladies={momentsBrossageDents} handleChangeValues={changeMomentBrossage}/>
        <CheckBoxComponent title="Midi" maladies={momentsBrossageDents} handleChangeValues={changeMomentBrossage}/>
        <CheckBoxComponent title="Soir" maladies={momentsBrossageDents} handleChangeValues={changeMomentBrossage}/>
      </View>
      <View style={{marginTop:25}}>
        <Label
          question="À quel rythme changez-vous de brosse à dents environ ?"
          statement={rythmeChangementBrosseAdent}
        />
        <View>
          <MultipleRadioComponent
            arrayChoix = {["Plus d'une fois par semaine", "Une fois par semaine", "Une à deux fois par mois", "Une à deux fois tous les 3 mois", "Au-delà de 3 mois"]} 
            valueState = {rythmeChangementBrosseAdent}
            handleOnPress = {changeRythmeBrosseADent}
          />
        </View>
      </View>

      <View style={{marginTop:25}}>
        <Label
          question="Utilisez-vous le fil de soie dentaire ou les brossettes inter-dentaires ?"
          statement={utilisationFilDentaireBrossette}
        />
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

