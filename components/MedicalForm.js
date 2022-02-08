import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import DatePicker from "react-native-datepicker";
import { globalStyles } from "../globalStyles";

const MedicalForm = ({values, setValues, focusedColor, focusBorderColor, blurBorderColor}) => {

  const [lastMedicAppointment, setLastMedicAppointment] = useState(new Date())

  const {dateDernierExamen} = values

  const onDateChange = (event, newDate)=>{
    const selectedDate = newDate || lastMedicAppointment;
    setLastMedicAppointment(selectedDate);
    setValues({...values, dateDernierExamen : lastMedicAppointment})
  }

  return (
    <SafeAreaView>
      <View style={globalStyles.flexRow}>
        <Text style={globalStyles.label}>
          &#8227; Nom du médecin traitant :
        </Text>
        <TextInput 
          value={values.medecinTraitant}
          onChangeText={(name)=>setValues({...values, medecinTraitant:name})}
          style={[globalStyles.input, {borderColor:`${focusedColor}`}]} 
          onFocus={focusBorderColor}
          onBlur={blurBorderColor}
        />
      </View>
      <View style={globalStyles.flexRow}>
        <Text style={globalStyles.label}>
          &#8227; Date du dernier examen médical (à quelques semaines près) :
        </Text>
        <DatePicker
          style={{width: 150}}
          date={lastMedicAppointment}
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
              display: `${dateDernierExamen ? "flex":'none'}`
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


export default MedicalForm;