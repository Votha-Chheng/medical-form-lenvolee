import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SubTitles from './SubTitles';
import { globalStyles } from '../globalStyles';
import RadioComponent from './RadioComponent';
import CheckBoxComponent from './CheckBoxComponent';
import QuestionsAutres from './QuestionsAutres';
import { RadioButton } from 'react-native-paper';

const Dents = ({values, setValues}) => {

  const [raisonExtractionInput, setRaisonExtractionInput] = useState('')
  const [extraRaisonExtraction, setExtraRaisonExtraction] = useState([])
  const [raisonInput, setRaisonInput] = useState("")
  const [metauxInput, setMetauxInput] = useState("")

  const {
    dentsExtraites,
    causesExtraction,
    dentsRemplacees,
    moyenDentRemplacement,
    raisonsNonRemplacementDentsExtraites,
    sensationProthesesActuelles,
    utilisationMetaux,
    preferencesUtilisationMetaux,
    dentsSensibles,
    listeSensibilite
  } = values

  const setValueToTrue = (keyName)=>{
    setValues({...values, [keyName]: true})
  }
  const setValueToFalse = (keyName, nextKey, isArray, arrayState, setSecondState = null, arrayStateSecond, arrayStateThird)=>{
    if(isArray){
      arrayState = []
      setSecondState !== null && setSecondState([])
    }
    setValues({...values, [keyName]: false, [nextKey]:`${isArray? []: undefined}`, [arrayStateSecond]: undefined, [arrayStateThird]: []})
  }
  const addRadioCausesExtraction = (isChecked, nameCause)=>{
    if(isChecked){
      setValues({...values, causesExtraction: [...causesExtraction, nameCause]})
    } else if(!isChecked){
      let temp = causesExtraction.filter(medic=> medic !== nameCause)
        setValues({...values, causesExtraction: temp})
    }
  }
  const addExtraRaisonExtraction = ()=>{
    if(raisonExtractionInput.length>0){
      setExtraRaisonExtraction([...extraRaisonExtraction, raisonExtractionInput])
      setValues({...values, causesExtraction: [...causesExtraction, raisonExtractionInput]})
      setRaisonExtractionInput("")
    }  
  }

  const deleteExtraRaisonExtraction = (event)=>{
    let temp = extraRaisonExtraction.filter(raison => raison !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    let tempState = causesExtraction.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    setExtraRaisonExtraction(temp)
    setValues({...values, causesExtraction: tempState})
  }

  const handleChangeValues = (isChecked, disease)=>{
    if(isChecked){
      setValues({...values, moyenDentRemplacement:[...moyenDentRemplacement, disease]})

    } else if(!isChecked){
      let temp = moyenDentRemplacement.filter(item => item !== disease)
      setValues({...values, moyenDentRemplacement:temp})

    }
  }
  const handleChangeSensibliteValues = (isChecked, sensibilite)=>{
    if(isChecked){
      setValues({...values, listeSensibilite:[...listeSensibilite, sensibilite]})

    } else if(!isChecked){
      let temp = listeSensibilite.filter(item => item !== sensibilite)
      setValues({...values, listeSensibilite:temp})

    }
  }

  const addRaison = ()=>{
    if(raisonInput.length>1){
      setValues({...values, raisonsNonRemplacementDentsExtraites : [...raisonsNonRemplacementDentsExtraites, raisonInput]})
      setRaisonInput("")
    }  
  }
  const deleteRaison = (event)=>{
    let tempState = raisonsNonRemplacementDentsExtraites.filter(raison => raison !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    setValues({...values, raisonsNonRemplacementDentsExtraites: tempState})
  }

  const addMetauxPreference = ()=>{
    if(metauxInput.length>1){
      setValues({...values, preferencesUtilisationMetaux : [...preferencesUtilisationMetaux, metauxInput]})
      setMetauxInput("")
    }  
  }
  const deletePreference = (event)=>{
    let tempState = preferencesUtilisationMetaux.filter(pref => pref !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    setValues({...values, preferencesUtilisationMetaux: tempState})
  }

  return (
    <View style={globalStyles.container}>
      <SubTitles title="Dents" />
      <View>
        <Text style={globalStyles.label}>&#8227; Avez-vous des dents extraites ?</Text>
        <RadioComponent
          valueState={dentsExtraites} 
          setValueToTrue = {()=>setValueToTrue("dentsExtraites")} 
          setValueToFalse = {()=>setValueToFalse("dentsExtraites", "causesExtraction", true, causesExtraction, setExtraRaisonExtraction)}
        />
        {
          dentsExtraites &&
          <View>
            <Text style={[globalStyles.label, {marginTop:-30, color:`${causesExtraction.length<1 ? "red" : "#000"}`}]}>
              &#8227; Pour quelles raisons ont-elles été extraites ?
            </Text>
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
            <View style={globalStyles.flexRow}>
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
                onPress={addExtraRaisonExtraction}>
                <Text style={{color:"#fff", fontSize:17.5}}>
                  {raisonExtractionInput.length>1 ? "Appuyer pour valider" : "AJOUTER"}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View>
              <Text style={[globalStyles.label, {color:`${dentsRemplacees === undefined? "red":"black"}`}]}>
                &#8227; Les dents extraites ont-elles été remplacées ?
              </Text>
              <RadioComponent
                valueState={dentsRemplacees} 
                setValueToTrue = {()=>setValueToTrue("dentsRemplacees")} 
                setValueToFalse = {()=>setValueToFalse("dentsRemplacees", "causesExtraction", false, null, null, "sensationProthesesActuelles", "moyenDentRemplacement")}
              />
              <View>
                {
                  dentsRemplacees==undefined ? null
                  :
                  dentsRemplacees ?
                  <View>
                    <View>
                      <Text style={[globalStyles.label, {marginTop:-20, color : `${moyenDentRemplacement.length>0 ? "black":"red"}`}]}>
                        &#8227; Par quoi ont-elles été remplacées ? :
                      </Text>
                      <CheckBoxComponent title="Un bridge fixe" checkedList={moyenDentRemplacement} handleChangeValues={handleChangeValues}/>
                      <CheckBoxComponent title="Un appareil mobile" checkedList={moyenDentRemplacement} handleChangeValues={handleChangeValues}/>
                      <CheckBoxComponent title="Un implant" checkedList={moyenDentRemplacement} handleChangeValues={handleChangeValues}/>
                    </View>
                    <View>
                      <Text style={[globalStyles.label, {marginTop:20, color : `${sensationProthesesActuelles ? "black":"red"}`}]} >
                        &#8227; Comment vous sentez-vous avec vos prothèses actuelles ?
                      </Text>
                      <View style={[globalStyles.flexRow, {marginBottom:0}]}>
                        <RadioButton
                          value="Confortable"
                          status={sensationProthesesActuelles===undefined || sensationProthesesActuelles !=="Confortable"? 'unchecked' :  'checked' }
                          onPress={()=>setValues({...values, sensationProthesesActuelles:"Confortable"})}
                        />
                        <Text 
                          style={sensationProthesesActuelles===undefined ||  sensationProthesesActuelles !=="Confortable"? {fontSize: 20, color:"grey"} : {fontSize: 20, color:"green", fontWeight:"bold"}}
                        >
                          Je ne ressens aucune gène avec mes prothèses.
                        </Text>
                      </View>
                      <View style={[globalStyles.flexRow, {marginBottom:0}]}>
                        <RadioButton
                          value="Un peu inconfortable"
                          status={sensationProthesesActuelles===undefined || sensationProthesesActuelles!=="Un peu inconfortable" ? 'unchecked' : 'checked' }
                          onPress={()=>setValues({...values, sensationProthesesActuelles:"Un peu inconfortable"})}
                        />
                        <Text 
                          style={sensationProthesesActuelles===undefined || sensationProthesesActuelles!=="Un peu inconfortable" ? {fontSize: 20, color:"grey"} : {fontSize: 20, color:"green", fontWeight:"bold"}}
                        >
                          Je ressens un peu d'inconfort.
                        </Text>
                      </View>
                      <View style={globalStyles.flexRow}>
                        <RadioButton
                          value="Très inconfortable"
                          status={sensationProthesesActuelles===undefined || sensationProthesesActuelles !=="Très inconfortable" ? 'unchecked' : 'checked'}
                          onPress={()=>setValues({...values, sensationProthesesActuelles:"Très inconfortable"})}
                        />
                        <Text 
                          style={sensationProthesesActuelles===undefined || sensationProthesesActuelles!=="Très inconfortable" ? {fontSize: 20, color:"grey"} : {fontSize: 20, color:"green", fontWeight:"bold"}}
                        >
                          Elles sont très gênantes.
                        </Text>
                      </View>
                    </View>
                    
                    
                  </View>
                  :
                  <View>
                    <Text style={[globalStyles.label, {marginTop:-20, color : `${raisonsNonRemplacementDentsExtraites.length>0 ? "black":"red"}`}]}>
                      &#8227; Pour quelle(s) raison(s) n'ont-elles pas été remplacées ? :
                    </Text>
                    <View style={globalStyles.flexRow}>
                      {
                        raisonsNonRemplacementDentsExtraites.length>0 &&
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
                        style={globalStyles.input}
                        placeholder="Entrez une cause à la fois s'il y en a plusieurs."
                      />
                      <TouchableOpacity
                        style={{backgroundColor:"#3798e8", height:40, marginLeft:7.5, width:120, paddingHorizontal:7.5, paddingTop:7}} 
                        onPress={addRaison}>
                        <Text style={{color:"#fff", fontSize:17.5, textAlign:"center"}}>AJOUTER</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              </View>
            </View>
          </View>  
        }
        <View>
          <Text style={[globalStyles.label, {color:`${utilisationMetaux===undefined?"red":"black"}`}]}>
            &#8227; Concernant l’utilisation des métaux dans votre bouche, avez-vous des préférences particulières ?
          </Text>
          <RadioComponent
            valueState ={utilisationMetaux}
            setValueToTrue={()=>setValueToTrue("utilisationMetaux")}
            setValueToFalse={()=>setValueToFalse("utilisationMetaux", "preferencesUtilisationMetaux", true, null, null)}
          />
        </View>
        {
          utilisationMetaux &&
          <View style={{marginTop:-25}}>
            <Text style={[globalStyles.label, {color:`${preferencesUtilisationMetaux.length>0 ? "black":"red"}`}]}>
              &#8227; Quelles sont ces préférences ? :
            </Text>
            <View style={globalStyles.flexRow}>
              {
                preferencesUtilisationMetaux.length>0 &&
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
              style={globalStyles.input}
              placeholder="Préférence"
            />
            <TouchableOpacity 
              style={metauxInput.length>2 ? styles.valid : styles.invalid} 
              onPress={addMetauxPreference}>
              <Text style={{color:"#fff", fontSize:17.5, textAlign:"center"}}>
                {metauxInput.length>2 ? "Appuyer pour valider" : "AJOUTER"}
              </Text>
            </TouchableOpacity>
          </View>  
        }
        <View>
          <Text style={[globalStyles.label, {color:`${dentsSensibles===undefined ? "red":"black"}`}]}>
            &#8227; Avez-vous des dents sensibles en général ?
          </Text>
          <RadioComponent
            valueState ={dentsSensibles}
            setValueToTrue={()=>setValueToTrue("dentsSensibles")}
            setValueToFalse={()=>setValueToFalse("dentsSensibles", "listeSensibilite", true, null, null)}
          />
          {
            dentsSensibles &&  
            <View>
              <Text style={[globalStyles.label, {color:`${listeSensibilite.length<1 ? "red":"black"}`}]}>
                &#8227; À quoi sont-elles sensibles ? :
              </Text>
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
    </View>
  );
};

export default Dents;

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
});
