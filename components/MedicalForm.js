import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import DatePicker from "react-native-datepicker";

const MedicalForm = ({values, setValues, focusedColor, focusBorderColor, blurBorderColor}) => {

  const [lastMedicAppointment, setLastMedicAppointment] = useState(new Date())

  const onDateChange = (event, newDate)=>{
    const selectedDate = newDate || lastMedicAppointment;
    setLastMedicAppointment(selectedDate);
    setValues({...values, dateDernierExamen : lastMedicAppointment})
    
  }

  return (
    <SafeAreaView>
      <View style={styles.flexRow}>
        <Text style={styles.label}>
          &#8227; Nom du médecin traitant :
        </Text>
        <TextInput 
          value={values.medecinTraitant}
          onChangeText={(name)=>setValues({...values, medecinTraitant:name})}
          style={[styles.input, {borderColor:`${focusedColor}`}]} 
          onFocus={focusBorderColor}
          onBlur={blurBorderColor}
        />
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.label}>
          &#8227; Date du dernier examen médical (à quelques semaines près) :
        </Text>
        <DatePicker
          style={{width: 150}}
          date={values.dateDernierExamen}
          androidMode="spinner"
          mode="date"
          format="DD/MM/YYYY"
          minDate="05-01-1900"
          maxDate={new Date()}
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
          onDateChange={onDateChange}
        />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label : {
    fontSize : 20,
    fontWeight:"bold",
    marginBottom:5,
    paddingRight:10,
    letterSpacing:0.75
  },
  flexRow : {
    flexDirection:"row", 
    alignItems:"center",
    marginBottom:20,
    marginTop:15,
    marginLeft:10
  },
  input:{
    width:"60%", 
    fontSize:20, 
    padding:7.5, 
    marginLeft:5, 
    borderWidth:2
  }
})

export default MedicalForm;