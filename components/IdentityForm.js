import { StyleSheet, Text, View, TextInput, SafeAreaView, Animated } from "react-native";
import {Picker} from '@react-native-picker/picker'
import { useState, useRef, useEffect } from "react";
import { RadioButton } from "react-native-paper";
import DatePicker from 'react-native-datepicker';
import { globalStyles } from "../globalStyles";
import Label from "./Label";
import { useValuesContext } from "../providers/ValuesProvider";

const IdentityForm = () => {
  const [date, setDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());

  const {values, setValues} = useValuesContext()

  const {
    dateRdv, 
    dateDeNaissance,
    genre,
    nom,
    prenom,
    tel,
    email,
    profession,
    adresse,
    codePostal,
    ville,
  } = values

  const translation = useRef(new Animated.Value(0)).current

  const switchToBottom = ()=>{
    Animated.timing(translation, {
      toValue: -33,
      duration: 250,
      useNativeDriver: true
    }).start()
  }
  const switchToTop = ()=>{
    Animated.timing(translation, {
      toValue: 3,
      duration: 250,
      useNativeDriver: true
    }).start()
  }
    
  useEffect(() => {
    genre === "Monsieur" ? switchToBottom() : switchToTop()
  }, [genre])

  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
    setValues({...values, dateRdv:currentDate})
  };

  const onBirthDayChange = (event, newDate)=>{
    const selectedDate = newDate || birthDate;
    setBirthDate(selectedDate);
    setValues({...values, dateDeNaissance : selectedDate})
  }

  const onValidateNothing = (value, keyToString, inputSetter)=>{
    setValues({...values, [keyToString] : value})
    inputSetter(value)
  }

  const onValidateName = (text, keyName)=>{
    if(text.length<1){
      setValues({...values, [keyName]:undefined})
    } else {
      setValues({...values, [keyName]:text})
    }
    
  }

  const onValidateNumber = (text)=>{
    if(text.startsWith(0) && text.length === 10){
      setValues({...values, tel:text})
    } else {
      setValues({...values, tel:undefined})
    }
  }
  const onValidateEmail = (text)=>{
    if(text.includes("@") && text.includes(".")){
      setValues({...values, email:text})
    } else {
      setValues({...values, email:undefined})
    }
  }
  const onValidateCodePostal = (text)=>{
    if(text.length>4){
      setValues({...values, codePostal:text})
    } else {
      setValues({...values, codePostal:undefined})
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.flexRow}>
        <Text style={globalStyles.label}>
          &#8227; Date de votre rendez-vous :
        </Text>
        <DatePicker
          style={{width: 200}}
          date={date}
          mode="date"
          format="DD/MM/YYYY"
          minDate="05-01-1900"
          maxDate={date}
          confirmBtnText="Choisir"
          cancelBtnText="Annuler"
          customStyles={{
            dateText:{
              fontSize: 20,
              display: `${dateRdv ? "flex":'none'}`
            },
            btnCancel :{
              color : "#ffffff"
            },
            btnConfirm :{
              color : "#ffffff"
            },

          }}
          onDateChange={onChange}
        />
      </View>
      <View style={globalStyles.flexRow}>
        <Text style={globalStyles.label}>
          &#8227; Vous avez rendez-vous avec le Dr :
         </Text>
         <View style={styles.picker}>
           <Picker
            selectedValue = {values.dr}
            onValueChange = {(itemValue)=> setValues({...values, dr: itemValue})}
            mode="dropdown"
            style={{transform:[{scaleX: 1.05}, {scaleY:1.1}, {translateX:5}]}}
          >
            <Picker.Item label="Sylvie MA-FRANCIN" value="Sylvie MA-FRANCIN"/>
          </Picker>
        </View>
      </View>
      <View style={{flexDirection:"row", marginTop : 15}}>
        <Text style={{fontSize:20, marginTop:7}} >&#8227;</Text>
        <Animated.View style={{marginVertical : 5, marginRight:10, width:125, transform : [{translateY : translation}]}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <RadioButton
              value="Madame"
              status={ genre === 'Madame' ? 'checked' : 'unchecked' }
              onPress={() => setValues({...values, genre:'Madame', enceinte:undefined})}
              />
            <Text 
              style={genre === 'Monsieur' ? 
              {fontSize: 15, color:"grey"} 
              : 
              {fontSize: 20, color:"black", fontWeight:"bold"}}
            >
              Madame
            </Text>
          </View>
          <View style={globalStyles.flexRow}>
            <RadioButton
              value="Monsieur"
              status={ genre === 'Monsieur' ? 'checked' : 'unchecked' }
              onPress={() => setValues({...values, genre:'Monsieur', enceinte:null, pilule:""})}
              />
            <Text 
              style={genre === 'Madame' ? 
              {fontSize: 15, color:"grey" } 
              : 
              {fontSize: 20, color:"black", fontWeight:"bold"}}
            >
              Monsieur
            </Text>
          </View>
        </Animated.View>
        <TextInput 
          style={[globalStyles.input,{borderWidth:2, width:250, marginLeft:25, marginTop:5, borderColor:`${nom === undefined ? "red":"green"}`}]} 
          placeholder="Nom de famille"
          onChangeText={(text)=>onValidateName(text, "nom")}
        />
        <TextInput 
          style={[globalStyles.input, {borderWidth:2, width:250, marginTop:5, borderColor:`${prenom === undefined ? "red":"green"}`}]} 
          placeholder="Prénom"
          onChangeText={(text)=>onValidateName(text, "prenom")}
        />
      </View> 
      <View style={[globalStyles.flexRow, { marginVertical:20}]}>
        <Label
          question="Date de naissance "
          statement={dateDeNaissance}
        />
        <DatePicker
          style={{width: 200}}
          date={birthDate}
          androidMode="spinner"
          mode="date"
          format="DD/MM/YYYY"
          minDate="05-01-1900"
          maxDate={new Date()}
          confirmBtnText="Choisir"
          cancelBtnText="Annuler"
          customStyles={{
            dateText:{
              fontSize: 20,
              display: `${dateDeNaissance ? "flex":'none'}`,
              color: "white"
            },
            dateInput:{
              backgroundColor:`${dateDeNaissance? "green":"#e5e2de"}`
            },
            btnCancel :{
              color : "#ffffff"
            },
            btnConfirm :{
              color : "#ffffff"
            },

          }}
          onDateChange={onBirthDayChange}
        />
      </View>
      <View style={globalStyles.flexRow}>
        <Label
          question="Téléphone "
          statement={tel}
        />
        <TextInput
          keyboardType="numeric"
          style={[globalStyles.input, {width:160, borderColor:`${tel===undefined? "grey":"green"}`}]}
          maxLength={10}
          onChangeText={(text)=>onValidateNumber(text)}
        />
      </View>
      <View style={globalStyles.flexRow}>
        <Label
          question="E-mail "
          statement={email}
        />
        <TextInput 
          keyboardType="email-address" 
          autoCapitalize='none'
          style={[globalStyles.input, {borderColor:`${email===undefined? "grey":"green"}`, width:300}]}
          onChangeText={(text)=>onValidateEmail(text)}
        />
      </View>
      <View style={globalStyles.flexRow}>
        <Label
          question="Profession "
          statement={profession}
        />
        <TextInput 
          style={[globalStyles.input, {borderColor:`${profession===undefined? "grey":"green"}`, width:250}]}
          onChangeText={(text)=>onValidateName(text, "profession")}
        />
      </View>
      <View style={{marginBottom:20}}>
        <Label
          question="Adresse "
          statement={adresse}
        />
        <TextInput 
          style={[globalStyles.input, {borderColor:`${adresse===undefined? "grey":"green"}`, width:"95%"}]}
          onChangeText={(text)=>onValidateName(text, "adresse")}
        />
      </View>
      <View style={globalStyles.flexRow}>
        <Label
          question="Ville "
          statement={ville}
        />
        <TextInput 
          style={[globalStyles.input, {borderColor:`${ville===undefined? "grey":"green"}`, width:300}]}
          onChangeText={(text)=>onValidateName(text, 'ville')}
        />
      </View>
      <View style={globalStyles.flexRow}>
        <Label
          question="Code postal "
          statement={codePostal}
        />
        <TextInput 
          keyboardType ="numeric"
          maxLength={5}
          style={[globalStyles.input, {borderColor:`${codePostal===undefined? "grey":"green"}`, width:85}]}
          onChangeText={(text)=>onValidateCodePostal(text)}
        />
      </View>
    </SafeAreaView>  

  );
}


const styles = StyleSheet.create({
  dateRdv : {
    fontSize : 20,
    padding : 7.5,
    color:"#333333",
    borderRadius : 5,
  },
  formItem : {
    marginVertical : 5
  },
  label : {
    fontSize : 20,
    fontWeight:"bold",
    marginBottom:5,
    paddingRight:10
  },
  picker : {
    width:250,
    alignSelf:"center",
    borderColor : "#000",
    borderWidth : 1,
    fontSize:17.5,
  },
  flexRow : {
    flexDirection:"row", 
    alignItems:"center",
    marginBottom:20
  }
})

export default IdentityForm;