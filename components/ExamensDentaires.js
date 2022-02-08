import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import RadioComponent from './RadioComponent';
import QuestionsAutres from './QuestionsAutres';
import {globalStyles} from '../globalStyles'

const ExamensDentaires = ({values, setValues, focusedColor, focusBorderColor, blurBorderColor}) => {
  const [dateLastExam, setDateLastExam] = useState(new Date())
  const [difficultesInput, setDifficultesInput] = useState("")
  const [difficultesListe, setDifficultesListe] = useState([])

  const {dateDernierExamDentaire, difficulteDentiste, listeDifficulteDentiste} = values

  const onDateChange = (event, newDate)=>{
    setDateLastExam(newDate)
    setValues({...values, dateDernierExamDentaire : dateLastExam})
  }

  const setValueToTrue = (keyName)=>{
    setValues({...values, [keyName]: true})
  }
  const setValueToFalse = (keyName, nextKey, isArray, setExtraArray)=>{
    if(isArray){
      setExtraArray([])
    }
    setValues({...values, [keyName]: false, [nextKey]:`${isArray? []: null}`})
  }

  const addDifficulty  = ()=>{
    if(difficultesInput.length>0){
      setValues({...values, listeDifficulteDentiste: [...listeDifficulteDentiste, difficultesInput]})
      setDifficultesListe([...difficultesListe, difficultesInput])
      setDifficultesInput("")
    }  
  }

  const deleteDifficulty = (event)=>{
    let temp = difficultesListe.filter(difficulty => difficulty !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    let tempState = listeDifficulteDentiste.filter(difficulty => difficulty !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    setValues({...values, listeDifficulteDentiste: tempState})
    setDifficultesListe(temp)
  }

  return (
    <View style={{marginTop:30}}>
      <View  style={[globalStyles.flexRow, {marginTop:30}]}>
        <Text style={globalStyles.label} >
          &#8227; A quand remonte votre dernier examen dentaire ?
        </Text>
        <DatePicker
          style={{width: 200}}
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
              backgroundColor:`${dateDernierExamDentaire ? "#e6f7f2":"#07f9f1"}`
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
      <View>
        <Text style={globalStyles.label}>
          &#8227; Quel est le motif de votre consultation ici ?
        </Text>
        <TextInput
          style={[globalStyles.input, {borderColor:`${focusedColor}`}]}
          onFocus={focusBorderColor}
          onBlur={blurBorderColor}
          onChangeText={(text)=>setValues({...values, motifConsultation:text})}
        />
      </View>
      <View style={{marginTop:20}}>
        <Text style={globalStyles.label}>
          &#8227; Lors de vos précédentes visites chez le dentiste avez-vous rencontré des difficultés particulières ?
        </Text>
        <RadioComponent 
          valueState={difficulteDentiste} 
          setValueToTrue = {()=>setValueToTrue("difficulteDentiste")} 
          setValueToFalse = {()=>setValueToFalse("difficulteDentiste", "listeDifficulteDentiste", true, setDifficultesListe)}
        />
      </View>
      {
        difficulteDentiste &&
        <View>
          <Text style={[globalStyles.label, {marginTop:-25}]}>
            &#8227; Quelles difficultés avez-vous rencontré ? :
          </Text>
          <TextInput
            onChangeText={(text)=>setDifficultesInput(text)}
            value={difficultesInput}
            style={globalStyles.input}
            placeholder="Décrire votre difficulté"
          />
          <TouchableOpacity 
            style={{backgroundColor:"#3798e8", height:40, width:120, marginLeft:7.5, marginVertical:5, paddingHorizontal:7.5, paddingTop:7}} 
            onPress={addDifficulty}>
            <Text style={{color:"#fff", fontSize:17.5, textAlign:"center"}}>AJOUTER</Text>
          </TouchableOpacity>
          
        </View>
      }
      <View style={globalStyles.flexRow}>
        {
          difficultesListe.length>0 &&
          difficultesListe.map((item, index)=>(
            <View key={index.toString()} style={{justifyContent:"flex-start"}}>
              <QuestionsAutres item={item} deleteFunction={(event)=>deleteDifficulty(event)}/>
            </View>
          ))  
        }
      </View>      
    </View>
  );
};

export default ExamensDentaires;

