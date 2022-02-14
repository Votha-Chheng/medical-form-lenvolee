import { useState } from "react";
import { SafeAreaView, View, TextInput } from "react-native";
import DatePicker from "react-native-datepicker";
import { globalStyles } from "../globalStyles";
import { useValuesContext } from "../providers/ValuesProvider";
import Label from "./Label";
import RadioComponent from "./RadioComponent";

const MedicalForm = () => {

  const [lastMedicAppointment, setLastMedicAppointment] = useState(new Date())

  const {values, setValues} = useValuesContext()

  const {
    dateDernierExamen, 
    medecinTraitant, 
    changementEtatSante
  } = values

  const onDateChange = (event, newDate)=>{
    const selectedDate = newDate || lastMedicAppointment;
    setLastMedicAppointment(selectedDate);
    setValues({...values, dateDernierExamen : selectedDate})
  }

  const setValueToTrue = (keyName)=>{
    setValues({...values, [keyName]: true})
  }
  const setValueToFalse = (keyName)=>{
    setValues({...values, [keyName]: false})
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={[globalStyles.flexRow, {marginTop:15}]}>
        <Label
          question="Nom du médecin traitant "
          statement={medecinTraitant}
        />
        <TextInput 
          onChangeText={(name)=>setValues({...values, medecinTraitant:name})}
          style={[globalStyles.input, {borderColor:`${medecinTraitant===undefined? "grey":"green"}`, width:200}]} 
        />
      </View>
      <View style={{marginBottom:20}}>
        <Label
          question="Date du dernier examen médical (à quelques semaines près) "
          statement={dateDernierExamen}
        />
        <DatePicker
          style={{width: 200, marginLeft:20}}
          date={lastMedicAppointment}
          androidMode="spinner"
          mode="date"
          format="DD/MM/YYYY"
          minDate="05-01-1900"
          maxDate={new Date()}
          confirmBtnText="Choisir"
          cancelBtnText="Annuler"
          customStyles={{
            dateInput:{
              backgroundColor:`${dateDernierExamen ? "green":"#e5e2de"}`,
              width:200
            },
            dateText:{
              fontSize: 20,
              display: `${dateDernierExamen ? "flex":'none'}`,
              color:"white"
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
      <View>
        <Label
          question="Avez-vous connu des changements dans votre état de santé depuis un an ? "
          statement={changementEtatSante}
        />
        <RadioComponent
          valueState ={changementEtatSante}
          setValueToTrue={()=>setValueToTrue("changementEtatSante")}
          setValueToFalse={()=>setValueToFalse("changementEtatSante")}
        />
      </View>
    </SafeAreaView>
  );
}

export default MedicalForm;