import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import RadioComponent from './RadioComponent';
import QuestionsAutres from './QuestionsAutres';
import {globalStyles} from '../globalStyles';
import Label from './Label'
import TextAreatAjouter from './TextAreatAjouter';
import { useValuesContext } from '../providers/ValuesProvider';

const ExamensDentaires = () => {
  const [dateLastExam, setDateLastExam] = useState(new Date())
  const [difficultesInput, setDifficultesInput] = useState("")

  const {values, setValues} = useValuesContext()

  const {
    dateDernierExamDentaire, 
    motifConsultation,
    difficulteDentiste, 
    listeDifficulteDentiste
  } = values

  const onDateChange = (event, newDate)=>{
    setDateLastExam(newDate)
    setValues({...values, dateDernierExamDentaire : dateLastExam})
  }

  const setValueToTrue = (keyName, keyToBeUndefined = null)=>{
    if(keyToBeUndefined!==null){
      setValues({...values, [keyName]: true, [keyToBeUndefined]:undefined})
    } else {
      setValues({...values, [keyName]: true})
    }
    
  }
  const setValueToFalse = (keyName, nextKey, isArray, setExtraArray=null)=>{
    if(isArray && setExtraArray!==null){
      setExtraArray([])
    }
    setValues({...values, [keyName]: false, [nextKey]:`${isArray? []: null}`})
  }

  const addDifficulty  = ()=>{
    if(difficultesInput.length>0){
      if(listeDifficulteDentiste === undefined){
        let array = [difficultesInput]
        setValues({...values, listeDifficulteDentiste:array})
        setDifficultesInput("")
      } else {
        setValues({...values, listeDifficulteDentiste: [...listeDifficulteDentiste, difficultesInput]})
        setDifficultesInput("")
      }  
    }
  }

  const deleteDifficulty = (event)=>{
    let tempState = listeDifficulteDentiste.filter(difficulty => difficulty !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    if(tempState.length<1){
      setValues({...values, listeDifficulteDentiste: undefined})

    } else {
      setValues({...values, listeDifficulteDentiste: tempState})

    }  
  }

  return (
    <View style={[globalStyles.container, {marginTop:10}]}>
      <View style={{marginBottom:50}}>
        <Label
          question="A quand remonte votre dernier examen dentaire ? "
          statement={dateDernierExamDentaire}
        />
        <DatePicker
          style={{width: 200, marginLeft:20}}
          date={dateLastExam}
          androidMode="spinner"
          mode="date"
          format="DD/MM/YYYY"
          minDate="05-01-1900"
          maxDate={new Date()}
          confirmBtnText="Choisir"
          cancelBtnText="Annuler"
          customStyles={{
            dateInput : {
              backgroundColor:`${dateDernierExamDentaire ? "#e6f7f2":"#EEEEEE"}`
            },
            dateText:{
              fontSize: 20,
              display: `${dateDernierExamDentaire ? "flex":'none'}`
            },
            btnCancel :{
              color : "#ffffff"
            },
            btnConfirm :{
              color : "#ffffff"
            },
          }}
          onDateChange={onDateChange}
        />
      </View>
      <View style={{marginBottom:50}}>
        <TextAreatAjouter
          values={values}
          setValues={setValues}
          questionDescription="Quel est le motif de votre consultation aujourd'hui ? "
          inputPlaceholder="Motif de votre consultation..."
          stateOuiNonToString ="preoccupationDentsOuiNon"
          stateNext = {motifConsultation}
          stateNextToString = "motifConsultation"
          unconditional={true}
        />
      </View>
      <View style={{marginTop:20}}>
        <Label
          question="Lors de vos précédentes visites chez le dentiste avez-vous rencontré des difficultés particulières ? "
          statement={difficulteDentiste}
        />
        <RadioComponent 
          valueState={difficulteDentiste} 
          setValueToTrue = {()=>setValueToTrue("difficulteDentiste", "listeDifficulteDentiste")} 
          setValueToFalse = {()=>setValueToFalse("difficulteDentiste", "listeDifficulteDentiste", true, null)}
        />
      </View>
      {
        (difficulteDentiste || listeDifficulteDentiste === undefined) &&
        <View style={{marginBottom:50}}>
          <Label
            question="Quelles difficultés avez-vous rencontré ? "
            statement={listeDifficulteDentiste}
          />
          <View style={[globalStyles.flexRow, {marginBottom:0}]}>
            {
              (listeDifficulteDentiste!==undefined && listeDifficulteDentiste.length>0) &&
              listeDifficulteDentiste.map((item, index)=>(
                <View key={index.toString()} style={{justifyContent:"flex-start"}}>
                  <QuestionsAutres item={item} deleteFunction={(event)=>deleteDifficulty(event)}/>
                </View>
              ))  
            }
          </View>    
          <TextInput
            onChangeText={(text)=>setDifficultesInput(text)}
            value={difficultesInput}
            style={[globalStyles.input, {width:"95%"}]}
            placeholder="Décrire votre difficulté"
          />
          <TouchableOpacity 
            style={{backgroundColor:"#3798e8", height:40, width:120, marginLeft:7.5, marginVertical:5, paddingHorizontal:7.5, paddingTop:7}} 
            onPress={addDifficulty}>
            <Text style={{color:"#fff", fontSize:17.5, textAlign:"center"}}>AJOUTER</Text>
          </TouchableOpacity>
        </View>
      }  
    </View>
  );
};

export default ExamensDentaires;

