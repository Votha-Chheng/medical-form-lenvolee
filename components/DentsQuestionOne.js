import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../globalStyles'
import Label from './Label'
import RadioComponent from './RadioComponent'
import SubTitles from './SubTitles'
import CheckBoxComponent from './CheckBoxComponent'
import QuestionsAutres from './QuestionsAutres'
import { RadioButton } from 'react-native-paper'
import { useValuesContext } from '../providers/ValuesProvider'

const DentsQuestionOne = () => {
  const [raisonExtractionInput, setRaisonExtractionInput] = useState('')
  const [extraRaisonExtraction, setExtraRaisonExtraction] = useState([])
  const [raisonInput, setRaisonInput] = useState("")

  const {values, setValues} = useValuesContext()

  const {
    dentsExtraites, 
    causesExtraction, 
    dentsRemplacees, 
    moyenDentRemplacement,
    raisonsNonRemplacementDentsExtraites,
    sensationProthesesActuelles
  } = values

  const setValueToTrue = (keyName, sideArray=null, extraSideArray=null)=>{
    if(sideArray!==null && extraSideArray!==null){
      setValues({...values, [keyName]: true, [sideArray]:undefined, [extraSideArray]:undefined})

    } else if (sideArray!==null && extraSideArray===null){
      setValues({...values, [keyName]: true, [sideArray]:undefined})

    } else {
      setValues({...values, [keyName]: true})
    }
    
  }
  
  const setDentsExtraitesToFalse = ()=>{
    setExtraRaisonExtraction([])
    setValues(
      {...values, 
        dentsExtraites: false, 
        causesExtraction:[], 
        moyenDentRemplacement:[], 
        dentsRemplacees:null, 
        sensationProthesesActuelles:null, 
        raisonsNonRemplacementDentsExtraites:[]
      }
    )
  }

  const setDentsRemplaceesToFalse = ()=>{
    setValues(
      {...values, 
        dentsRemplacees:false,
        raisonsNonRemplacementDentsExtraites:undefined,
        sensationProthesesActuelles:null,
        moyenDentRemplacement:[]
      }
    )
  }

  //A utiliser dans toutes les checkbox qui apparaissent sous conditions
  //Si le tableau est undefined, il faut le rendre non-nul pour le modifier
  const radioIsUndefined = (isCkeckedStatus, input, stateArray, stateArrayToString)=>{
    if(isCkeckedStatus){
      let tempState = [input]
      setValues({...values, [stateArrayToString]: tempState})

    } else if(!isCkeckedStatus){
      let tempState = stateArray.filter(traitement => traitement !== input)
      setValues({...values, [stateArrayToString]: tempState})
      
    }
  }
  //Si le tableau est vide, il devient undefined
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

  const addRadioCausesExtraction = (isChecked, nameCause)=>{
    if(causesExtraction===undefined){
      radioIsUndefined(isChecked, nameCause, causesExtraction, "causesExtraction")

    } else {
      radioIsDefined(isChecked, nameCause, causesExtraction, "causesExtraction")
    }  
  }

  const addExtraRaisonExtraction = ()=>{
    if(raisonExtractionInput.length>0){
      if(causesExtraction===undefined){
        let temp = [raisonExtractionInput]
        setExtraRaisonExtraction(temp)
        setValues({...values, causesExtraction: temp})
        setRaisonExtractionInput("")
      } else {
        setExtraRaisonExtraction([...extraRaisonExtraction, raisonExtractionInput])
        setValues({...values, causesExtraction: [...causesExtraction, raisonExtractionInput]})
        setRaisonExtractionInput("")
      }
      
    }  
  }

  const deleteExtraRaisonExtraction = (event)=>{
    let temp = extraRaisonExtraction.filter(raison => raison !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    setExtraRaisonExtraction(temp)

    let tempState = causesExtraction.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    if(tempState.length<1){
      setValues({...values, causesExtraction: undefined})
    } else {
      setValues({...values, causesExtraction: tempState})
    }
    
  }

  const handleChangeValues = (isChecked, nameCause)=>{
    if(moyenDentRemplacement===undefined){
      radioIsUndefined(isChecked, nameCause, moyenDentRemplacement, "moyenDentRemplacement")

    } else {
      radioIsDefined(isChecked, nameCause, moyenDentRemplacement, "moyenDentRemplacement")
    }  
  }

  const addRaisonNonRemplacement = ()=>{
    if(raisonInput.length>1){
      if(raisonsNonRemplacementDentsExtraites===undefined){
        let temp = [raisonInput]
        setValues({...values, raisonsNonRemplacementDentsExtraites : temp})
        setRaisonInput("")
      } else {
        setValues({...values, raisonsNonRemplacementDentsExtraites : [...raisonsNonRemplacementDentsExtraites, raisonInput]})
        setRaisonInput("")
      }
      
    }  
  }
  const deleteRaison = (event)=>{
    let tempState = raisonsNonRemplacementDentsExtraites.filter(raison => raison !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    if(tempState.length<1){
      setValues({...values, raisonsNonRemplacementDentsExtraites: undefined})
    } else {
      setValues({...values, raisonsNonRemplacementDentsExtraites: tempState})
    }
    
  }

  return (
    <View style={globalStyles.container}>
      <SubTitles title="DENTS" />
      <View>
        <Label
          question="Avez-vous des dents extraites ?"
          statement={dentsExtraites}
        />
        <RadioComponent
          valueState={dentsExtraites} 
          setValueToTrue = {()=>setValueToTrue("dentsExtraites", "causesExtraction", "dentsRemplacees")} 
          setValueToFalse = {setDentsExtraitesToFalse}
        />
      </View>
      {
        dentsExtraites &&
        <View style={{marginBottom:30}}>
          <Label
            question="Pour quelles raisons ont-elles été extraites ?"
            statement={causesExtraction}
          />
          <View style={globalStyles.flexRow}>
            <View style={{marginRight:30}}>
              <CheckBoxComponent title="Caries" maladies={causesExtraction} handleChangeValues={addRadioCausesExtraction}/>
              <CheckBoxComponent title="Infection ou abcès" maladies={causesExtraction} handleChangeValues={addRadioCausesExtraction}/>
            </View>
            <View>
              <CheckBoxComponent title="Déchaussement" maladies={causesExtraction} handleChangeValues={addRadioCausesExtraction}/>
              <CheckBoxComponent title="Dent incluse" maladies={causesExtraction} handleChangeValues={addRadioCausesExtraction}/>
            </View>
          </View>
          <View style={globalStyles.flexRow}>
            {
              extraRaisonExtraction.length>0 &&
              extraRaisonExtraction.map((extraRaison, index)=>(
                <View key={index.toString()}>
                  <QuestionsAutres item={extraRaison} deleteFunction={(event)=>deleteExtraRaisonExtraction(event)}/>
                </View>    
              ))
            }
          </View>
          <View style={[globalStyles.flexRow, {marginBottom:50}]}>
            <Text style={globalStyles.label}>
              Autres raisons :
            </Text>
            <TextInput
              onChangeText={(text)=>setRaisonExtractionInput(text)}
              value={raisonExtractionInput}
              style={[globalStyles.input, {width:400}]}
              placeholder="Raison de l'extraction"
            />
            <TouchableOpacity
              style={{backgroundColor:`${raisonExtractionInput.length>1 ? "green" : "#3798e8"}`, height:40, paddingHorizontal:7.5, paddingTop:7}} 
              onPress={addExtraRaisonExtraction}
            >
              <Text style={{color:"#fff", fontSize:17.5, borderRadius:3}}>
                {raisonExtractionInput.length>1 ? "VALIDER" : "AJOUTER"}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View>
            <View style={{marginBottom:0}}>
              <Label
                question="Les dents extraites ont-elles été remplacées ?"
                statement={dentsRemplacees}
              />
              <RadioComponent
                valueState={dentsRemplacees} 
                setValueToTrue = {()=>setValueToTrue("dentsRemplacees", "moyenDentRemplacement", "sensationProthesesActuelles")} 
                setValueToFalse = {setDentsRemplaceesToFalse}
              />
            </View>
            
            <View>
              {
                dentsRemplacees==undefined ? null
                :
                dentsRemplacees ?
                <View>
                  <View style={{marginBottom:30}}>
                    <Label
                      question="Par quoi ont-elles été remplacées ?"
                      statement={moyenDentRemplacement}
                    />
                    <CheckBoxComponent title="Un bridge fixe" checkedList={moyenDentRemplacement} handleChangeValues={handleChangeValues}/>
                    <CheckBoxComponent title="Un appareil mobile" checkedList={moyenDentRemplacement} handleChangeValues={handleChangeValues}/>
                    <CheckBoxComponent title="Un implant" checkedList={moyenDentRemplacement} handleChangeValues={handleChangeValues}/>
                  </View>

                  <View style={{marginTop:20}}>
                    <Label
                      question="Comment vous sentez-vous avec vos prothèses actuelles ?"
                      statement={sensationProthesesActuelles}
                    />
                    <View style={[globalStyles.flexRow, {marginBottom:0}]}>
                      <RadioButton
                        value="Confortable"
                        status={
                          sensationProthesesActuelles===undefined || sensationProthesesActuelles !=="Confortable"
                          ? 
                          'unchecked' 
                          :  
                          'checked' 
                        }
                        onPress={()=>setValues({...values, sensationProthesesActuelles:"Confortable"})}
                      />
                      <Text 
                        style={
                          sensationProthesesActuelles===undefined ||  sensationProthesesActuelles !=="Confortable"
                          ? 
                          {fontSize: 20, color:"grey"} 
                          : 
                          {fontSize: 20, color:"green", fontWeight:"bold"}
                        }
                      >
                        Je ne ressens aucune gêne avec mes prothèses.
                      </Text>
                    </View>
                    <View style={[globalStyles.flexRow, {marginBottom:0}]}>
                      <RadioButton
                        value="Un peu inconfortable"
                        status={
                          sensationProthesesActuelles===undefined || sensationProthesesActuelles!=="Un peu inconfortable" 
                          ? 
                          'unchecked' 
                          : 
                          'checked' 
                        }
                        onPress={()=>setValues({...values, sensationProthesesActuelles:"Un peu inconfortable"})}
                      />
                      <Text 
                        style={
                          sensationProthesesActuelles===undefined || sensationProthesesActuelles!=="Un peu inconfortable" 
                          ? 
                          {fontSize: 20, color:"grey"} 
                          : 
                          {fontSize: 20, color:"green", fontWeight:"bold"}
                        }
                      >
                        Je ressens un peu d'inconfort.
                      </Text>
                    </View>
                    <View style={globalStyles.flexRow}>
                      <RadioButton
                        value="Très inconfortable"
                        status={
                          sensationProthesesActuelles===undefined || sensationProthesesActuelles !=="Très inconfortable" 
                          ? 
                          'unchecked' 
                          : 
                          'checked'
                        }
                        onPress={()=>setValues({...values, sensationProthesesActuelles:"Très inconfortable"})}
                      />
                      <Text 
                        style={
                          sensationProthesesActuelles===undefined || sensationProthesesActuelles!=="Très inconfortable" 
                          ? 
                          {fontSize: 20, color:"grey"} 
                          : 
                          {fontSize: 20, color:"green", fontWeight:"bold"}
                        }
                      >
                        Elles sont très gênantes.
                      </Text>
                    </View>
                  </View>
                </View>
                :
                <View>
                  <Label
                    question="Pour quelle(s) raison(s) n'ont-elles pas été remplacées ?"
                    statement={raisonsNonRemplacementDentsExtraites}
                  />
                  <View style={globalStyles.flexRow}>
                    {
                      raisonsNonRemplacementDentsExtraites!==undefined &&
                      raisonsNonRemplacementDentsExtraites.map((raison, index)=>(
                        <View key={index.toString()}>
                          <QuestionsAutres item={raison} deleteFunction={(event)=>deleteRaison(event)}/>
                        </View>
                      ))
                    }
                  </View>
                  <View style={{marginTop:-15}}>
                    <TextInput
                      onChangeText={(text)=>setRaisonInput(text)}
                      value={raisonInput}
                      style={[globalStyles.input, {width:"95%"}]}
                      placeholder="Entrez une cause à la fois s'il y en a plusieurs."
                    />
                    <TouchableOpacity
                      style={{backgroundColor:"#3798e8", height:40, marginLeft:7.5, width:120, paddingHorizontal:7.5, paddingTop:7}} 
                      onPress={addRaisonNonRemplacement}>
                      <Text style={{color:"#fff", fontSize:17.5, textAlign:"center"}}>AJOUTER</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
            </View>
          </View>
        </View>  
      }
    </View>
  )
}

export default DentsQuestionOne