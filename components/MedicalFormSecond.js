import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import RadioComponent from './RadioComponent';
import QuestionsAutres from './QuestionsAutres';
import CheckBoxComponent from './CheckBoxComponent';
import { globalStyles } from '../globalStyles';
import Label from './Label';
import { useValuesContext } from '../providers/ValuesProvider';

const MedicalFormSecond = () => {
  const [textInput, setTextInput] = useState("")
  const [extraMedic, setExtraMedic] = useState([])
  const [allergieInput, setAllergieInput] = useState("")
  const [allergiesArray, setAllergiesArray] = useState([])

  const {values, setValues} = useValuesContext()
  
  const {
    saignementInterventionAccident,
    traitementRadiations,
    priseMedicamentActuelle, 
    medicamentsActuels,
    allergies,
    allergiesListe,
    fumeur,
    cigarettesParJour,
    genre,
    enceinte,
    moisDeGrossesse,
    pilule,
    osteoporose,
    medicOsteoporose,
  } = values
  
  const setValueToTrue = (keyName, sideKey=null)=>{
    if(sideKey!==null){
      setValues({...values, [keyName]: true, [sideKey]:undefined})
    } else {
      setValues({...values, [keyName]: true})
    }
  }

  const setValueToFalse = (keyName, nextKey=null, isArray, setExtraArray)=>{
    if(isArray && setExtraArray){
      setExtraArray([])
    }
    setValues({...values, [keyName]: false, [nextKey]:`${isArray? []: null}`})
  }


  //Medicaments
  const addRadioExtraMedic = (isChecked, nameMedic)=>{
    if(medicamentsActuels===undefined){

      let emptyArray = []

      if(isChecked){
        setValues({...values, medicamentsActuels: [...emptyArray, nameMedic]})

      } else if(!isChecked){
        let temp = values.medicamentsActuels.filter(medic=> medic !== nameMedic)
        setValues({...values, medicamentsActuels: temp})

      }

    } else {

      if(isChecked){
        setValues({...values, medicamentsActuels: [...medicamentsActuels, nameMedic]})

      } else if(!isChecked){

        let temp = medicamentsActuels.filter(medic=> medic !== nameMedic)

        if(temp.length<1){
          setValues({...values, medicamentsActuels: undefined})

        } else {
          setValues({...values, medicamentsActuels: temp})

        }
        
      }
    }
  }

  const addExtraMedic = ()=>{
    if(textInput.length>0){
      setExtraMedic([...extraMedic, textInput])

      if(medicamentsActuels===undefined){
        let tempState = [textInput]
        setValues({...values, medicamentsActuels : tempState})
        setTextInput("")

      } else {
        setValues({...values, medicamentsActuels: [...medicamentsActuels, textInput]})
        setTextInput("")

      }
    }  
  }
  const deleteExtraMedic = (event)=>{
    let temp = extraMedic.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    setExtraMedic(temp)

    let tempState = medicamentsActuels.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    if(tempState.length<1){
      setValues({...values, medicamentsActuels: undefined})
    } else {
      setValues({...values, medicamentsActuels: tempState})
    }
    
  }

  //Allergies
  const addRadioAllergies = (isChecked, nameAllergie)=>{
    if(allergiesListe===undefined){
      let emptyArray = []
      if(isChecked){
        setValues({...values, allergiesListe: [...emptyArray, nameAllergie]})
      } else if(!isChecked){
        let tempState = allergiesListe.filter(allerg => allerg !== nameAllergie)
          setValues({...values, allergiesListe: tempState})
      }

    } else {
      if(isChecked){
        setValues({...values, allergiesListe: [...allergiesListe, nameAllergie]})

      } else if(!isChecked){
        let temp = allergiesListe.filter(medic=> medic !== nameAllergie)
        
        if(temp.length<1){
          setValues({...values, allergiesListe: undefined})
        } else {
          setValues({...values, allergiesListe: temp})
        }
      }
    }
    
  }

  const addAllergie = ()=>{
    if(allergieInput.length>0){
      if(allergiesListe===undefined){
        let emptyArray = [allergieInput]
        setValues({...values, allergiesListe: emptyArray})
        setAllergiesArray(emptyArray)
        setAllergieInput("")

      } else {
        setValues({...values, allergiesListe: [...allergiesListe, allergieInput]})
        setAllergiesArray([...allergiesArray, allergieInput])
        setAllergieInput("")

      }
    }
  }

  const deleteAllergie = (event)=>{
    let temp = allergiesArray.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    setAllergiesArray(temp)

    let tempState = allergiesListe.filter(medic => medic !== event._dispatchInstances.memoizedProps.children[0][0].props.children)
    if(tempState.length<1){
      setValues({...values, allergiesListe:undefined})

    } else {
      setValues({...values, allergiesListe: tempState})

    }
    
  }

  //Médicaments ostéoporose
  const addRadioOsteoMedic = (isChecked, nameMedic)=>{
    if(medicOsteoporose===undefined){
      
      if(isChecked){
        let emptyArray = [nameMedic]
        setValues({...values, medicOsteoporose: emptyArray})

      } else if(!isChecked){

        let temp = medicOsteoporose.filter(medic=> medic !== nameMedic)
        if(temp.length<1){
          setValues({...values, medicOsteoporose:undefined})
        } else {
          setValues({...values, medicOsteoporose: temp})
        }
      }
    } else {

      if(isChecked){
        setValues({...values, medicOsteoporose: [...medicOsteoporose, nameMedic]})

      } else if(!isChecked){
        let temp = medicOsteoporose.filter(medic=> medic !== nameMedic)
        
        if(temp.length<1){
          setValues({...values, medicOsteoporose:undefined})
        } else {
          setValues({...values, medicOsteoporose: temp})
        }

      }
    }
  }

  const setEnceinteToFalse = ()=>{
    setValues({...values, enceinte: false, pilule:undefined})

  }

  return (
    <View style={[globalStyles.container, {marginTop:20}]}>
      <Label
        question="Avez-vous déjà eu un saignement anormal au cours d’une intervention ou d’un accident ? "
        statement={saignementInterventionAccident}
      />
      <RadioComponent 
        valueState={saignementInterventionAccident} 
        setValueToTrue = {()=>setValueToTrue("saignementInterventionAccident")} 
        setValueToFalse = {()=>setValueToFalse("saignementInterventionAccident")}
      />
      <Label
        question="Avez-vous subi un traitement par radiations ? "
        statement={traitementRadiations}
      />
      <RadioComponent 
        valueState={traitementRadiations} 
        setValueToTrue = {()=>setValueToTrue("traitementRadiations")} 
        setValueToFalse = {()=>setValueToFalse("traitementRadiations")}
      />
      <View style={{marginBottom:30}}>
        <Label
          question="Prenez-vous des médicaments en ce moment ? "
          statement={priseMedicamentActuelle}
        />
        <RadioComponent 
          valueState={priseMedicamentActuelle} 
          setValueToTrue = {()=>setValueToTrue("priseMedicamentActuelle", "medicamentsActuels")} 
          setValueToFalse = {()=>setValueToFalse("priseMedicamentActuelle", "medicamentsActuels", true, setExtraMedic)}
        />
      </View>
      
      {
        priseMedicamentActuelle &&
        <View>
          <Text style={[globalStyles.label, {marginTop:-25, color:`${medicamentsActuels === undefined? "red":"black"}`}]}>
            &#8227; Quel(s) médicament(s) prenez-vous ? :
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
          
          <View style={{marginTop:-10, flexDirection:"row", alignItems:"center"}}>
            <Text style={globalStyles.label}>
              Autres médicaments :
            </Text>
            <View style={[globalStyles.flexRow, {flexWrap:"wrap", marginTop:25}]}>
              {
                extraMedic.length>0 &&
                extraMedic.map((medic, index)=>(
                  <View key={index.toString()}>
                    <QuestionsAutres item={medic} deleteFunction={(event)=>deleteExtraMedic(event)}/>
                  </View>
                ))
              }
            </View>
          </View>
          <View style={[globalStyles.flexRow, {marginBottom:50}]}>
            <TextInput
              onChangeText={(text)=>setTextInput(text)}
              value={textInput}
              style={[globalStyles.input, {width:400}]}
              placeholder="Nom du médicament"
            />
            <TouchableOpacity 
              style={{backgroundColor:"#3798e8", marginLeft:7.5, width:150, height:40, paddingHorizontal:7.5, paddingTop:7}} 
              onPress={addExtraMedic}>
              <Text style={{color:"#fff", fontSize:17.5, textAlign:"center"}}>AJOUTER</Text>
            </TouchableOpacity>
          </View>    
        </View>  
      }

      <View style={{marginVertical:10}}>
        <Label
          question="Êtes-vous allergique à certains produits ou médicaments ? "
          statement={allergies}
        />
        <RadioComponent 
          valueState={allergies} 
          setValueToTrue = {()=>setValueToTrue("allergies", "allergiesListe")} 
          setValueToFalse = {()=>setValueToFalse("allergies", "allergiesListe", true, setAllergiesArray)}
        />
        {
          allergies &&
          <View style={{marginTop:-25}}>
            <Label
              question="À quoi êtes-vous allergique ? "
              statement={allergiesListe}
            />
            <View style={[globalStyles.flexRow, {alignItems:"flex-start"}]}>
              <View style={{marginHorizontal:5}}>
                <CheckBoxComponent title="Anesthésique local du Dentiste" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
                <CheckBoxComponent title="Iode et produits dérivés" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
                <CheckBoxComponent title="Métal" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
                <CheckBoxComponent title="Antibiotique" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>    
                <CheckBoxComponent title="Latex" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
              </View>
              <View style={{marginHorizontal:10}}>
                <CheckBoxComponent title="Barbituriques" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
                <CheckBoxComponent title="Anti-inflammatoire ou aspirine" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
                <CheckBoxComponent title="Neuroleptique ou somnifère" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
                <CheckBoxComponent title="Codéine" maladies={allergiesListe} handleChangeValues={addRadioAllergies}/>
              </View>
            </View>
            <View>
              <View>
                <Text style={globalStyles.label}>
                  &#8227; Autres produits :
                </Text>
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
              </View>
              
              <View style={globalStyles.flexRow}>
                <TextInput
                  onChangeText={(text)=>setAllergieInput(text)}
                  value={allergieInput}
                  style={[globalStyles.input, {width:250}]}
                  placeholder="Allergie"
                />
                <TouchableOpacity 
                  style={{backgroundColor:"#3798e8", marginLeft:5, height:40, paddingHorizontal:7.5, paddingTop:7, width:150}} 
                  onPress={addAllergie}>
                  <Text style={{color:"#fff", fontSize:17.5, textAlign:"center"}}>AJOUTER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </View>

      <View>
        <Label
          question="&Ecirc;tes-vous fumeur ?"
          statement={fumeur}
        />
        <RadioComponent 
          valueState={fumeur} 
          setValueToTrue = {()=>setValueToTrue("fumeur", "cigarettesParJour")} 
          setValueToFalse = {()=>setValueToFalse("fumeur", "cigarettesParJour")}
        />
        {
          fumeur &&
          <View style={globalStyles.flexRow}>
            <Label
              question="Combien de cigarettes fumez-vous par jour environ ? "
              statement={cigarettesParJour}
            />
            <TextInput 
              style={[globalStyles.input, {width:40, textAlign:'center', marginTop:-10}]}
              keyboardType='numeric' 
              onChangeText={(text)=>setValues({...values, cigarettesParJour: +text})}
            />
          </View>
        }  
      </View>

      <View>
        {
          genre ==="Madame" &&
          <View>
            <Label
              question="Madame, êtes-vous enceinte ? "
              statement={enceinte}
            />
            <RadioComponent 
              valueState={enceinte} 
              setValueToTrue = {()=>setValueToTrue("enceinte", "moisDeGrossesse")} 
              setValueToFalse = {setEnceinteToFalse}
            />
          </View>
        
        }
        
        {
          enceinte &&
          <View style={globalStyles.flexRow}>
            <Label
              question="Vous êtes enceinte de combien de mois ?"
              statement={moisDeGrossesse}
            />
            <TextInput 
              style={[globalStyles.input, {width:40, textAlign:'center', marginTop:-10}]}
              keyboardType='numeric' 
              onChangeText={(text)=>setValues({...values, moisDeGrossesse: +text})}
            />
          </View>
        }
        {
          (!enceinte && enceinte!==undefined && genre==="Madame") &&
          <View>
            <Label
              question="Prenez-vous actuellement la pilule ?"
              statement={pilule}
            />
            <RadioComponent 
              valueState={pilule} 
              setValueToTrue = {()=>setValueToTrue("pilule")} 
              setValueToFalse = {()=>setValueToFalse("pilule")}
            />
          </View>
        }
        <View>
          <Label
            question="Prenez-vous actuellement un traitement contre l'ostéoporose ou une maladie osseuse ? "
            statement={osteoporose}
          />
          <RadioComponent 
            valueState={osteoporose} 
            setValueToTrue = {()=>setValueToTrue("osteoporose", "medicOsteoporose")} 
            setValueToFalse = {()=>setValueToFalse("osteoporose", "medicOsteoporose", true)}
          />
          {
            osteoporose &&
            <View style={{marginBottom:50}}>
              <Label
                question="Quels types de médicaments contre l'ostéoporose prenez-vous ? "
                statement={medicOsteoporose}
              />
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
