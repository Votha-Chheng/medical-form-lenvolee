import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../globalStyles'
import RadioComponent from './RadioComponent'
import Label from './Label'
import QuestionsAutres from './QuestionsAutres'
import CheckBoxComponent from './CheckBoxComponent'
import { useValuesContext } from '../providers/ValuesProvider'

const DentsQuestionTwo = () => {

  const [metauxInput, setMetauxInput] = useState("")

  const {values, setValues} = useValuesContext()

  const {
    utilisationMetaux, 
    preferencesUtilisationMetaux, 
    dentsSensibles, 
    listeSensibilite
  } = values

  const setValueToTrue = (keyName, secondKeyName)=>{
    setValues({...values, [keyName]:true, [secondKeyName]:undefined})
  }
  const setValueToFalse = (keyName, secondKeyName, valuesSecondKey)=>{
    setValues({...values, [keyName]:false, [secondKeyName]:valuesSecondKey})
  }

  const addMetauxPreference = ()=>{
    if(metauxInput.length>1){
      if(preferencesUtilisationMetaux===undefined){
        setValues({...values, preferencesUtilisationMetaux: [metauxInput]})
        setMetauxInput("")
      } else {
        setValues({...values, preferencesUtilisationMetaux : [...preferencesUtilisationMetaux, metauxInput]})
        setMetauxInput("")
      }
      
    }  
  }
  const deletePreference = (event)=>{
    let tempState = preferencesUtilisationMetaux.filter(pref => pref !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    if(tempState.length<1){
      setValues({...values, preferencesUtilisationMetaux: undefined})
    } else {
      setValues({...values, preferencesUtilisationMetaux: tempState})
    }
  }

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

  const handleChangeSensibliteValues = (isChecked, sensibilite)=>{
    if(listeSensibilite===undefined){
      radioIsUndefined(isChecked, sensibilite, listeSensibilite, "listeSensibilite")

    } else {
      radioIsDefined(isChecked, sensibilite, listeSensibilite, "listeSensibilite")
    } 
  }

  return (
    <View style={globalStyles.container}>
      <View>
        <Label
          question="Concernant l’utilisation des métaux dans votre bouche, avez-vous des préférences particulières ?"
          statement={utilisationMetaux}
        />
        <RadioComponent
          valueState ={utilisationMetaux}
          setValueToTrue={()=>setValueToTrue("utilisationMetaux", "preferencesUtilisationMetaux")}
          setValueToFalse={()=>setValueToFalse("utilisationMetaux", "preferencesUtilisationMetaux", [])}
        />
        </View>
        {
          utilisationMetaux &&
          <View style={{marginTop:-10, marginBottom:10}}>
            <Label
              question="Quelles sont ces préférences ?"
              statement={preferencesUtilisationMetaux}
            />
            <View style={globalStyles.flexRow}>
              {
                preferencesUtilisationMetaux!==undefined &&
                preferencesUtilisationMetaux.map((pref, index)=>(
                  <View key={index.toString()}>
                    <QuestionsAutres item={pref} deleteFunction={(event)=>deletePreference(event)} />
                  </View>
                ))
              }
            </View>
            
            <TextInput
              onChangeText={(text)=>setMetauxInput(text)}
              value={metauxInput}
              style={[globalStyles.input, {width:"95%", marginTop:-15}]}
              placeholder="Préférence"
            />
            <TouchableOpacity 
              style={metauxInput.length>2 ? styles.valid : styles.invalid} 
              onPress={addMetauxPreference}
            >
              <Text style={{color:"#fff", fontSize:17.5, textAlign:"center"}}>
                {metauxInput.length>2 ? "VALIDER" : "AJOUTER"}
              </Text>
            </TouchableOpacity>
          </View>  
        }
        <View>
          <Label
            question="Avez-vous des dents sensibles en général ?"
            statement={dentsSensibles}
          />
          <RadioComponent
            valueState ={dentsSensibles}
            setValueToTrue={()=>setValueToTrue("dentsSensibles", "listeSensibilite")}
            setValueToFalse={()=>setValueToFalse("dentsSensibles", "listeSensibilite", [])}
          />
          {
            dentsSensibles &&  
            <View>
              <Label
                question="À quoi sont-elles sensibles ?"
                statement={listeSensibilite}
              />
              <View style={[globalStyles.flexRow, {alignItems: "flex-start"}]}>
                <View>
                  <CheckBoxComponent title="Au chaud" checkedList={listeSensibilite} handleChangeValues={handleChangeSensibliteValues}/>
                  <CheckBoxComponent title="Au froid" checkedList={listeSensibilite} handleChangeValues={handleChangeSensibliteValues}/>
                  <CheckBoxComponent title="Au sucre" checkedList={listeSensibilite} handleChangeValues={handleChangeSensibliteValues}/>
                </View>
                <View style={{marginLeft:40}}>
                  <CheckBoxComponent title="Au goût acide" checkedList={listeSensibilite} handleChangeValues={handleChangeSensibliteValues}/>
                  <CheckBoxComponent title="À la mastication" checkedList={listeSensibilite} handleChangeValues={handleChangeSensibliteValues}/>
                </View>
              </View>  
            </View>
          }
          
        </View>
    </View>
  )
}

export default DentsQuestionTwo

const styles = StyleSheet.create({
  valid:{
    backgroundColor: "green", 
    width:200,
    height:40, 
    paddingHorizontal:7.5, 
    paddingTop:7, 
    marginLeft:7.5,
    marginTop:5
  },
  invalid:{
    backgroundColor: "#3798e8", 
    width:125,
    height:40, 
    paddingHorizontal:7.5, 
    paddingTop:7, 
    marginLeft:7.5,
    marginTop:5
  }
})