import { StyleSheet, Text, View, Pressable, TextInput, SafeAreaView, TouchableOpacity, Animated } from "react-native";
import {Picker} from '@react-native-picker/picker'
import { useState, useRef, useEffect } from "react";
import { dateToString } from "../utils";
import { RadioButton } from "react-native-paper";
import DatePicker from 'react-native-datepicker';
import PhoneInput from 'react-native-phone-input';

const IdentityForm = ({values, setValues}) => {
  const [date, setDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const [checked, setChecked] = useState('Madame');

  const translation = useRef(new Animated.Value(0)).current
  const phone = useRef()

  const switchToBottom = ()=>{
    Animated.timing(translation, {
      toValue: -35,
      duration: 250,
      useNativeDriver: true
    }).start()
  }
  const switchToTop = ()=>{
    Animated.timing(translation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start()
  }
    
  useEffect(() => {
    checked === "Monsieur" ? switchToBottom() : switchToTop()
  }, [checked])

  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setDate(date)
    setValues({...values, dateRdv:currentDate.toLocaleString()})
  };

  const onValueChange = (event, newDate)=>{
    const selectedDate = newDate || birthDate;
    setBirthDate(selectedDate);
    setValues({...values, dateDeNaissance : birthDate})
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexRow}>
        <Text style={styles.label}>
          &#8227; Date de votre rendez-vous :
        </Text>
        <DatePicker
          style={{width: 200}}
          date={birthDate}
          mode="date"
          format="DD/MM/YYYY"
          minDate="05-01-1900"
          maxDate={date}
          confirmBtnText="Choisir"
          cancelBtnText="Annuler"
          customStyles={{
            dateIcon: {
              display: 'none',
            },
            dateText:{
              fontSize: 20
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
      <View style={styles.flexRow}>
        <Text style={styles.label}>
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
        <Animated.View style={{marginVertical : 5, transform : [{translateY : translation}], width:120}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <RadioButton
              value="Madame"
              status={ checked === 'Madame' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('Madame')}
              />
            <Text 
              style={checked === 'Monsieur' ? 
              {fontSize: 15, color:"grey"} 
              : 
              {fontSize: 20, color:"black", fontWeight:"bold"}}
            >
              Madame
            </Text>
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <RadioButton
              value="Monsieur"
              status={ checked === 'Monsieur' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('Monsieur')}
              />
            <Text 
              style={checked === 'Madame' ? 
              {fontSize: 15, color:"grey" } 
              : 
              {fontSize: 20, color:"black", fontWeight:"bold"}}
            >
              Monsieur
            </Text>
          </View>
        </Animated.View>
        <TextInput 
          style={{alignSelf:"flex-start", borderColor:"#000000", borderWidth: 2, width: 250, height: 45, fontSize: 20, paddingHorizontal:10, marginLeft:7.5}} 
          placeholder="Nom de famille"
        />
        <TextInput 
          style={{alignSelf:"flex-start", borderColor:"#000000", borderWidth: 2, width: 250, height: 45, fontSize: 20, paddingHorizontal:10, marginLeft:7.5}} 
          placeholder="Prénom"
        />
      </View> 
      <View style={{flexDirection:"row", alignItems:"center", marginVertical:20}}>
        <Text style={styles.label}>&#8227; Date de naissance :</Text>
        <DatePicker
          style={{width: 200}}
          date={birthDate}
          androidMode="spinner"
          mode="date"
          format="DD/MM/YYYY"
          minDate="05-01-1900"
          maxDate={date}
          confirmBtnText="Choisir"
          cancelBtnText="Annuler"
          customStyles={{
            dateIcon: {
              display: 'none',
            },
            dateText:{
              fontSize: 20
            },
            btnCancel :{
              color : "#ffffff"
            },
            btnConfirm :{
              color : "#ffffff"
            },

          }}
          onDateChange={onValueChange}
        />
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.label}>&#8227; Téléphone :</Text>
        <PhoneInput 
          ref={phone}
          allowZeroAfterCountryCode={true}
          accessibilityLabel="Champ pour le numéro de téléphone"
          initialCountry="fr"
          onPressFlag={()=>null}
          isValidNumber = {(isValidNumber)=>console.log("isValidNumber :", isValidNumber)}
          textStyle={{fontSize:17.5, marginTop:2.5}}
          style={{borderColor:"grey", borderWidth:2, height:40, width:210, paddingHorizontal:7.5}}
          //onChangePhoneNumber={(value)=>console.log(value)}
        />
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.label}>&#8227; E-mail :</Text>
        <TextInput 
          keyboardType="email-address" 
          autoCapitalize='none'
          style={{borderColor:"grey", borderWidth:2, height:35, width:250, paddingHorizontal:5, fontSize:20}}
        />
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.label}>&#8227; Profession :</Text>
        <TextInput 
          autoCapitalize='none'
          style={{borderColor:"grey", borderWidth:2, height:35, width:250, paddingHorizontal:5, fontSize:20}}
        />
      </View>
      <View>
        <Text style={styles.label}>&#8227; Adresse :</Text>
        <TextInput 
          autoCapitalize='none'
          style={{borderColor:"grey", borderWidth:2, height:32, width:"99%", paddingHorizontal:5, fontSize:18, marginBottom :25}}
        />
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.label}>&#8227; Ville :</Text>
        <TextInput 
          style={{borderColor:"grey", borderWidth:2, height:35, width:250, paddingHorizontal:5, fontSize:18}}
        />
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.label}>&#8227; Code postal :</Text>
        <TextInput 
          keyboardType ="numeric"
          maxLength={5}
          style={{borderColor:"grey", borderWidth:2, height:35, width:65, paddingHorizontal:5, fontSize:18, textAlign:'center',}}
        />
      </View>
    </SafeAreaView>  

  );
}


const styles = StyleSheet.create({
  container : {
    paddingLeft:10,
    paddingTop: 10
  },
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