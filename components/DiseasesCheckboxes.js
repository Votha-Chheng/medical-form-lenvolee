import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import CheckBoxComponent from './CheckBoxComponent';

const DiseasesCheckboxes = ({values, setValues, focusedColor, focusBorderColor, blurBorderColor}) => {
  const [inputValue, setInputValue] = useState("")
  const [showNewValues, setShowNewValues] = useState(false)
  const [extraDiseases, setExtraDiseases] = useState(["blabla", "reblabla"])
  const [checkedList, setCheckedList] = useState({
    antidepresseurs:false,
    maladieFoie : false,
    protheses : false,
    asthme:false,
    maladieCardiaque:false,
    rhumatismeAigu : false,
    chirugieEsthetique: false,
    maladieDuSang:false,
    thyroide: false,
    diabete: false,
    hepatite:false,
    perteConnaissance : false,
    troublesReins:false,
    lesionCardiaque:false,
    problemeCirculatoire:false,
    tumeurMaligne:false,
    hiv:false,
    desordreHormone:false,
    maladieVenerienne:false,
    sinusites:false,
    oedemes:false,
    syncopeVertiges:false,
    glaucome:false,
    pacemaker:false,
    ulceres:false,
    problemesNerveux:false
  })

  const handleChangeValues = (isChecked, key)=>{
    setCheckedList({...checkedList, [key]: isChecked}) 
  }

  const validateNewDisease = ()=> {
    let arrayDisease = [...extraDiseases, inputValue]
    setExtraDiseases(arrayDisease)
    setShowNewValues(false)
  }

  return (
    <View style={{marginLeft:10}}>
      <Text style={styles.label}>
        &#8227; Merci de cocher chacune des maladies ou problèmes que vous avez pu avoir par le passé ou que vous avez actuellement :
      </Text>
      <View style={{flexDirection:"row"}}>
        <View style={{marginRight:50}}>
          <CheckBoxComponent title="Antidépresseurs" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="antidepresseurs"/>
          <CheckBoxComponent title="Maladie du foie" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="maladieFoie" />
          <CheckBoxComponent title="Prothèses non-dentaires" handleChangeValues={handleChangeValues} checkedList={checkedList} slug="protheses"/>
          <CheckBoxComponent title="Asthme" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="asthme" />
          <CheckBoxComponent title="Maladie cardiaque" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="maladieCardiaque"/>
          <CheckBoxComponent title="Rhumatisme aigu" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="rhumatismeAigu"/>
          <CheckBoxComponent title="Chirugie esthétique" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="chirugieEsthetique"/>
          <CheckBoxComponent title="Maladie du sang" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="maladieDuSang"/>
          <CheckBoxComponent title="Thyroïde" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="thyroide"/>
          <CheckBoxComponent title="Diabète" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="diabete"/>
          <CheckBoxComponent title="Hépatite" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="hepatite"/>
          <CheckBoxComponent title="Pertes de connaissance" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="perteConnaissance"/>
          <CheckBoxComponent title="Troubles des reins" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="troublesReins"/>
        </View>
        <View style={{marginLeft:30}}>
          <CheckBoxComponent title="Lésions cardiaques congénitales " checkedList={checkedList} handleChangeValues={handleChangeValues} slug="lesionCardiaque"/>
          <CheckBoxComponent title="Problèmes circulatoires" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="problemeCirculatoire" />
          <CheckBoxComponent title="Tumeur maligne" handleChangeValues={handleChangeValues} checkedList={checkedList} slug="tumeurMaligne"/>
          <CheckBoxComponent title="HIV" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="hiv" />
          <CheckBoxComponent title="Désordres hormonaux" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="desordreHormone"/>
          <CheckBoxComponent title="Maladies vénériennes " checkedList={checkedList} handleChangeValues={handleChangeValues} slug="maladieVenerienne"/>
          <CheckBoxComponent title="Sinusites répétées" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="sinusites"/>
          <CheckBoxComponent title="Œdèmes (gonflements) " checkedList={checkedList} handleChangeValues={handleChangeValues} slug="oedemes"/>
          <CheckBoxComponent title="Syncopes, vertiges" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="syncopeVertiges"/>
          <CheckBoxComponent title="Glaucome" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="glaucome"/>
          <CheckBoxComponent title="Pacemaker" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="pacemaker"/>
          <CheckBoxComponent title="Ulcères à l’estomac" checkedList={checkedList} handleChangeValues={handleChangeValues} slug="ulceres"/>
          <CheckBoxComponent title="Problèmes nerveux " checkedList={checkedList} handleChangeValues={handleChangeValues} slug="problemesNerveux"/>
        </View>
      </View>
      <View>
        <Text style={[styles.label, {marginTop:15}]}>
          Autres :
        </Text>
        
        <View style={styles.flexRow}>
          {
            showNewValues ?
            <View style={{flexDirection:'row'}}>
              <TextInput 
                style={[styles.input, {borderColor:`${focusedColor}`}]} 
                onFocus={focusBorderColor}
                onBlur={blurBorderColor} 
                onChangeText={(text)=>setInputValue(text)}
                placeholder='Ajouter'
              />
              <Pressable
                style={{backgroundColor:"orange", marginLeft:5, paddingHorizontal:5, paddingVertical:10}}
                onPress={()=>setShowNewValues(false)}
              >
                <Text style={{color:"white", fontSize:17.5}}>
                  ANNULER
                </Text>
              </Pressable>
              <Pressable
                style={{backgroundColor:"green", marginLeft:5, paddingHorizontal:10, paddingVertical:10}}
                onPress={validateNewDisease}
              >
                <Text style={{color:"white", fontSize:17.5}}>
                  VALIDER
                </Text>
              </Pressable>
            </View>
            
            :
            <Pressable
              style={{backgroundColor:"#3798e8", marginLeft:5, paddingHorizontal:10, paddingVertical:10}}
              onPress={()=>setShowNewValues(true)}
            >
              <Text style={{color:"white", fontSize:17.5}}>
                AJOUTER
              </Text>
            </Pressable>
          }
          
        </View>
        <View style={styles.extraDiseases}> 
          {
            extraDiseases.length>0 ? 
            extraDiseases.map((disease, index)=> (
              <View style={[styles.flexRow, {marginRight : 10, borderWidth:2, borderColor:"grey", padding:5, paddingBottom:0}]}>
                <Text style={[styles.label]}>
                  {disease}
                </Text>
                <Pressable 
                  onPress={()=>console.log("Pressed")}
                  style={{backgroundColor:"orange", width:30, marginTop:-7.5}}
                >
                  <Text style={{color:"white", fontSize:25, textAlign:'center'}}>X</Text>
                </Pressable>
              </View>
              
            ))
              
            : null
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label : {
    fontSize : 20,
    fontWeight:"bold",
    marginBottom:10,
    paddingRight:10,
    letterSpacing:0.75
  },
  input:{
    width:200, 
    fontSize:20, 
    padding:5, 
    marginLeft:5, 
    borderWidth:2
  },
  extraDiseases :{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  flexRow : {
    flexDirection:"row", 
    alignItems:"center",
    marginBottom:20
  }
})

export default DiseasesCheckboxes;

