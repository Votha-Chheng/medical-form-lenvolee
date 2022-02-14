import { View } from 'react-native';
import React from 'react';
import SubTitles from './SubTitles';
import RadioComponent from './RadioComponent';
import CheckBoxComponent from './CheckBoxComponent';
import Label from './Label';
import { useValuesContext } from '../providers/ValuesProvider';

const Gencives = () => {

  const {values, setValues} = useValuesContext()

  const {
    dentsEcartes, 
    saignementGencive, 
    traitementGencive, 
    traitementGencivesPar
  } = values

  const setValueToTrue = (keyName, sideArray=null)=>{
    
    if(sideArray!==null){
      setValues({...values, [keyName]: true, [sideArray]: undefined})
    } else {
      setValues({...values, [keyName]: true})
    }
    
  }

  const setValueToFalse = (keyName, nextKey, isArray)=>{
    setValues({...values, [keyName]: false, [nextKey]:`${isArray? []: null}`})
  }

  const addRadioTypesTraitement = (isChecked, nameTraitement)=>{
    if(traitementGencivesPar===undefined){

      if(isChecked){
        let tempState = [nameTraitement]
        setValues({...values, traitementGencivesPar: tempState})

      } else if(!isChecked){
        let tempState = traitementGencivesPar.filter(traitement => traitement !== nameTraitement)
        setValues({...values, traitementGencivesPar: tempState})
        
      }

    } else {
      if(isChecked){
        setValues({...values, traitementGencivesPar: [...traitementGencivesPar, nameTraitement]})

      } else if(!isChecked){
        let tempState = traitementGencivesPar.filter(traitement => traitement !== nameTraitement)

        if(tempState.length<1){
          setValues({...values, traitementGencivesPar: undefined})
        } else {
          setValues({...values, traitementGencivesPar: tempState})
        }
      }
    }  
  }

  return (
    <View style={{marginLeft:5}}>
      <SubTitles title="GENCIVES" />
      <View>
        <Label
          question="Avez-vous remarqué que vos dents se sont écartées depuis quelque temps ?"
          statement={dentsEcartes}
        />
        <RadioComponent
          valueState={dentsEcartes} 
          setValueToTrue = {()=>setValueToTrue("dentsEcartes")} 
          setValueToFalse = {()=>setValueToFalse("dentsEcartes", null)}
        />
      </View>
      <View>
        <Label
          question="Vos gencives saignent-elles après le brossage, voire spontanément ?"
          statement={saignementGencive}
        />
        <RadioComponent
          valueState={saignementGencive} 
          setValueToTrue = {()=>setValueToTrue("saignementGencive")} 
          setValueToFalse = {()=>setValueToFalse("saignementGencive", null)}
        />
      </View>
      <View style={{marginBottom:5}}>
        <Label
          question="Avez-vous déjà été traité(e) pour les gencives ?"
          statement={traitementGencive}
        />
        <RadioComponent
          valueState={traitementGencive} 
          setValueToTrue = {()=>setValueToTrue("traitementGencive", "traitementGencivesPar")} 
          setValueToFalse = {()=>setValueToFalse("traitementGencive", "traitementGencivesPar", true)}
        />
        {
          traitementGencive &&
          <View style={{marginTop:-25, marginBottom:30}}>
            <Label
              question="Le(s) traitement(s) a/ont été effectué(s) par "
              statement={traitementGencivesPar}
            />
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

