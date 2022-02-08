import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import RadioComponent from './RadioComponent';
import QuestionsAutres from './QuestionsAutres';
import CheckBoxComponent from './CheckBoxComponent';
import { globalStyles } from '../globalStyles';

const MedicalFormSecond = ({values, setValues}) => {
  const [textInput, setTextInput] = useState("")
  const [extraMedic, setExtraMedic] = useState([])
  const [allergieInput, setAllergieInput] = useState("")
  const [allergiesArray, setAllergiesArray] = useState([])
  const [medicOsteoposrose, setMedicOsteoposrose] = useState([])
  
  const {
    saignementInterventionAccident,
    traitementRadiations,
    priseMedicamentActuelle, 
    medicamentsActuels,
    allergies,
    allergiesListe,
    fumeur,
    enceinte,
    pilule,
    osteoporose,
    medicOsteoporose,
  } = values
  
  const setValueToTrue = (keyName)=>{
    setValues({...values, [keyName]: true})
  }
  const setValueToFalse = (keyName, nextKey, isArray, setExtraArray)=>{
    if(isArray){
      setExtraArray([])
    }
    setValues({...values, [keyName]: false, [nextKey]:`${isArray? []: null}`})
  }


  //Medicaments
  const addRadioExtraMedic = (isChecked, nameMedic)=>{
    if(isChecked){
      setValues({...values, medicamentsActuels: [...medicamentsActuels, nameMedic]})
    } else if(!isChecked){
      let temp = medicamentsActuels.filter(medic=> medic !== nameMedic)
        setValues({...values, medicamentsActuels: temp})
    }
  }

  const addExtraMedic = ()=>{
    if(textInput.length>0){
      setExtraMedic([...extraMedic, textInput])
      setValues({...values, medicamentsActuels: [...medicamentsActuels, textInput]})
      setTextInput("")
    }  
  }
  const deleteExtraMedic = (event)=>{
    let temp = extraMedic.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    let tempState = medicamentsActuels.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    setExtraMedic(temp)
    setValues({...values, medicamentsActuels: tempState})
  }

  //Allergies
  const addRadioAllergies = (isChecked, nameAllergie)=>{
    if(isChecked){
      setValues({...values, allergiesListe: [...allergiesListe, nameAllergie]})
    } else if(!isChecked){
      let tempState = allergiesListe.filter(allerg => allerg !== nameAllergie)
        setValues({...values, allergiesListe: tempState})
    }
  }

  const addAllergie = ()=>{
    if(allergieInput.length>0){
      setValues({...values, allergiesListe: [...allergiesListe, allergieInput]})
      setAllergiesArray([...allergiesArray, allergieInput])
      setAllergieInput("")
    }  
  }
  const deleteAllergie = (event)=>{
    let temp = allergiesArray.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    let tempState = allergiesListe.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    setValues({...values, allergiesListe: tempState})
    setAllergiesArray(temp)
  }

  //Médicaments ostéoporose
  const addRadioOsteoMedic = (isChecked, nameMedic)=>{
    if(isChecked){
      setValues({...values, medicOsteoporose: [...medicOsteoporose, nameMedic]})
    } else if(!isChecked){
      let temp = medicOsteoporose.filter(medic=> medic !== nameMedic)
        setValues({...values, medicOsteoporose: temp})
    }
  }

  return (
    <View style={{marginTop:20}}>
      <Text style={globalStyles.label}>
        &#8227; Avez-vous déjà eu un saignement anormal au cours d’une intervention ou d’un accident ? 
      </Text>
      <RadioComponent 
        valueState={saignementInterventionAccident} 
        setValueToTrue = {()=>setValueToTrue("saignementInterventionAccident")} 
        setValueToFalse = {()=>setValueToFalse("saignementInterventionAccident")}
      />
      <Text style={globalStyles.label}>
        &#8227; Avez-vous subi un traitement par radiations ? 
      </Text>
      <RadioComponent 
        valueState={traitementRadiations} 
        setValueToTrue = {()=>setValueToTrue("traitementRadiations")} 
        setValueToFalse = {()=>setValueToFalse("traitementRadiations")}
      />
      <Text style={globalStyles.label}>
        &#8227; Prenez-vous des médicaments en ce moment ? 
      </Text>
      <RadioComponent 
        valueState={priseMedicamentActuelle} 
        setValueToTrue = {()=>setValueToTrue("priseMedicamentActuelle")} 
        setValueToFalse = {()=>setValueToFalse("priseMedicamentActuelle", "medicamentsActuels", true, setExtraMedic)}
      />
      {
        priseMedicamentActuelle &&
        <View>
          <Text style={[globalStyles.label, {marginTop:-25}]}>
            Si oui, lesquels ? :
          </Text>
          <View style={[globalStyles.flexRow, {alignItems:"flex-start"}]}>
            <View style={{marginHorizontal:25}}>
              <CheckBoxComponent title="Antibiotiques" maladies={medicamentsActuels} handleChangeValues={addRadioExtraMedic}/>
              <CheckBoxComponent title="Antihistaminiques" maladies={medicamentsActuels} handleChangeValues={addRadioExtraMedic}/>
              <CheckBoxComponent title="Tranquillisants" maladies={medicamentsActuels} handleChangeValues={addRadioExtraMedic}/>
              <CheckBoxComponent title="Aspirine" maladies={medicamentsActuels} handleChangeValues={addRadioExtraMedic}/>    
            </View>
            <View style={{marginHorizontal:25}}>
              <CheckBoxComponent title="Traitement pour la tension artérielle" maladies={medicamentsActuels} handleChangeValues={addRadioExtraMedic}/>
              <CheckBoxComponent title="Cortisone" maladies={medicamentsActuels} handleChangeValues={addRadioExtraMedic}/>
              <CheckBoxComponent title="Insuline" maladies={medicamentsActuels} handleChangeValues={addRadioExtraMedic}/>
            </View>
          </View>
          
          <View style={{marginTop:15, flexDirection:"row", alignItems:"center"}}>
            <Text style={globalStyles.label}>
              Autres médicaments :
            </Text>
            <TextInput
              onChangeText={(text)=>setTextInput(text)}
              value={textInput}
              style={globalStyles.input}
              placeholder="Nom du médicament"
            />
            <TouchableOpacity 
              style={{backgroundColor:"#3798e8", height:40, paddingHorizontal:7.5, paddingTop:7}} 
              onPress={addExtraMedic}>
              <Text style={{color:"#fff", fontSize:17.5}}>AJOUTER</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      }
      <View style={globalStyles.flexRow}>
        {
          extraMedic.length>0 &&
          extraMedic.map((medic, index)=>(
            <View key={index.toString()}>
              <QuestionsAutres item={medic} deleteFunction={(event)=>deleteExtraMedic(event)}/>
            </View>
          ))
        }
      </View>
      <Text style={[globalStyles.label, {marginTop:20}]}>
        &#8227; Êtes-vous allergique à certains produits ou médicaments ?
      </Text>
      <RadioComponent 
        valueState={allergies} 
        setValueToTrue = {()=>setValueToTrue("allergies")} 
        setValueToFalse = {()=>setValueToFalse("allergies", "allergiesListe", true, setAllergiesArray)}
      />
      {
        allergies &&
        <View style={{marginTop:-25}}>
          <Text style={globalStyles.label}>
            Si oui, à quels produits ? :
          </Text>
          <View style={[globalStyles.flexRow, {alignItems:"flex-start"}]}>
            <View style={{marginHorizontal:25}}>
              <CheckBoxComponent title="Anesthésique local du Dentiste" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
              <CheckBoxComponent title="Iode et produits dérivés" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
              <CheckBoxComponent title="Métal" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
              <CheckBoxComponent title="Antibiotique" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>    
              <CheckBoxComponent title="Latex" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
            </View>
            <View style={{marginHorizontal:25}}>
              <CheckBoxComponent title="Barbituriques" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
              <CheckBoxComponent title="Anti-inflammatoire ou aspirine" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
              <CheckBoxComponent title="Neuroleptique ou somnifère" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
              <CheckBoxComponent title="Codéine" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
            </View>
          </View>
          <View style={[globalStyles.flexRow, {alignItems:"center"}]}>
            <Text style={globalStyles.label}>
              Autres produits :
            </Text>
            <TextInput
              onChangeText={(text)=>setAllergieInput(text)}
              value={allergieInput}
              style={globalStyles.input}
              placeholder="Allergie"
            />
            <TouchableOpacity 
              style={{backgroundColor:"#3798e8", height:40, paddingHorizontal:7.5, paddingTop:7}} 
              onPress={addAllergie}>
              <Text style={{color:"#fff", fontSize:17.5}}>AJOUTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      <View style={globalStyles.flexRow}>
        {
          allergiesArray.length>0 &&
          allergiesArray.map((allergie, index)=>(
            <View key={index}>
              <QuestionsAutres item={allergie} deleteFunction={(event)=>deleteAllergie(event)}/>
            </View>
            
          ))
        }
      </View>

      <View>
        <Text style={[globalStyles.label, {marginTop:20}]}>
          &#8227; &Ecirc;tes-vous fumeur ? 
        </Text>
        <RadioComponent 
          valueState={fumeur} 
          setValueToTrue = {()=>setValueToTrue("fumeur")} 
          setValueToFalse = {()=>setValueToFalse("fumeur", "cigarettesParJour")}
        />
        {
          fumeur &&
          <View style={globalStyles.flexRow}>
            <Text style={globalStyles.label}>
              &#8227; Combien de cigarettes par jour environ ?
            </Text>
            <TextInput 
              style={[globalStyles.input, {width:40, textAlign:'center', marginTop:-10}]}
              keyboardType='numeric' 
              onChangeText={(text)=>setValues({...values, cigarettesParJour: +text})}
            />
          </View>
        }  
      </View>
      
      <View>
        <Text style={[globalStyles.label, {marginTop:20}]}>
          &#8227; Madame, êtes-vous enceinte ?
        </Text>
        <RadioComponent 
          valueState={enceinte} 
          setValueToTrue = {()=>setValueToTrue("enceinte")} 
          setValueToFalse = {()=>setValueToFalse("enceinte", "moisDeGrossesse")}
        />
        {
          enceinte &&
          <View style={globalStyles.flexRow}>
            <Text style={globalStyles.label}>
              &#8227; Vous êtes enceinte de combien de mois ?
            </Text>
            <TextInput 
              style={[globalStyles.input, {width:40, textAlign:'center', marginTop:-10}]}
              keyboardType='numeric' 
              onChangeText={(text)=>setValues({...values, moisDeGrossesse: +text})}
            />
          </View>
        }
        {
          !enceinte &&
          <View>
            <Text style={globalStyles.label}>
              &#8227; Prenez-vous actuellement la pilule ?
            </Text>
            <RadioComponent 
              valueState={pilule} 
              setValueToTrue = {()=>setValueToTrue("pilule")} 
              setValueToFalse = {()=>setValueToFalse("pilule")}
            />
          </View>
        }
        <View>
          <Text style={globalStyles.label}>
            &#8227; Prenez-vous actuellement un traitement contre l'ostéoporose ou une maladie osseuse ?
          </Text>
          <RadioComponent 
            valueState={osteoporose} 
            setValueToTrue = {()=>setValueToTrue("osteoporose")} 
            setValueToFalse = {()=>setValueToFalse("osteoporose", "medicOsteoporose", true, setMedicOsteoposrose)}
          />
          {
            osteoporose &&
            <View style={{marginBottom:50}}>
              <Text style={globalStyles.label}>
                &#8227; Quels types de médicaments contre l'ostéoporose prenez-vous ?
              </Text>
              <View style={{marginHorizontal:25}}>
                <CheckBoxComponent title="Hormones" maladies={medicOsteoporose} handleChangeValues={addRadioOsteoMedic}/>
                <CheckBoxComponent title="Œstrogènes" maladies={medicOsteoporose} handleChangeValues={addRadioOsteoMedic}/>
                <CheckBoxComponent title="Biphosphonate" maladies={medicOsteoporose} handleChangeValues={addRadioOsteoMedic}/>
              </View>
            </View>
          }
        </View>
      </View>
    </View>
  );
};

export default MedicalFormSecond;
