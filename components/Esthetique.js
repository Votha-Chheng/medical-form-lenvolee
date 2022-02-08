import { StyleSheet, Text, TextInput, TextInputBase, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SubTitles from './SubTitles';
import { globalStyles } from '../globalStyles';
import RadioComponent from './RadioComponent';
import Label from './Label';
import TextAreaInput from './TextAreaInput';

const Esthetique = ({values, setValues}) => {

  //const [changementSourire, setChangementSourire] = useState(undefined)
  const [souhaitsInput, setSouhaitsInput] = useState("")
  //const [modifier, setModifier] = useState(false)

  const {
    dentsMemeCouleurs,
    souhaitDentsPlusBlanches,
    satisfactionDentsGencives,
    mainDevantBoucheSourire,
    souhaitsChangementOuiNon,
    souhaitsChangement
  } = values

  const setValueToTrue = (keyName)=>{
    setValues({...values, [keyName]:true})
  }
  const setValueToFalse = (keyName)=>{
    setValues({...values, [keyName]:false})
  }

  const setSourireChangementToFalse = ()=>{
    setValues({...values, souhaitsChangementOuiNon : false, souhaitsChangement:""})
    setModifier(false)
    setSouhaitsInput("")
  }

  const handleValidateSouhaitChangement = (textState, keyName, input)=>{
    if(souhaitsInput.length>2){
      setValues({...values, souhaitsChangement: souhaitsInput})
      //setModifier(false)
    }
  }

  return (
    <View style={[globalStyles.container, {marginBottom:25}]}>
      <SubTitles title="DENTISTERIE ESTH&Eacute;TIQUE" />
      <View>
        <View>
          <Label 
            question="Dans un large sourire, vos dents sont-elles toutes de la même couleur ?"
            statement={dentsMemeCouleurs}
            isArray={false}
            conditional={false}
          />
          <RadioComponent
            valueState={dentsMemeCouleurs}
            setValueToTrue={()=>setValueToTrue("dentsMemeCouleurs")}
            setValueToFalse={()=>setValueToFalse("dentsMemeCouleurs")}
          />
        </View>
        <View>
          <Label 
            question="Aimeriez-vous avoir des dents plus blanches ?"
            statement={souhaitDentsPlusBlanches}
            isArray={false}
            conditional={false}
          />
          <RadioComponent
            valueState={souhaitDentsPlusBlanches}
            setValueToTrue={()=>setValueToTrue("souhaitDentsPlusBlanches")}
            setValueToFalse={()=>setValueToFalse("souhaitDentsPlusBlanches")}
          />
        </View>
        <View>
          <Label 
            question="Êtes-vous satisfait(e) de l’apparence de vos dents et de vos gencives ?"
            statement={satisfactionDentsGencives}
            isArray={false}
            conditional={false}
          />
          <RadioComponent
            valueState={satisfactionDentsGencives}
            setValueToTrue={()=>setValueToTrue("satisfactionDentsGencives")}
            setValueToFalse={()=>setValueToFalse("satisfactionDentsGencives")}
          />
        </View>
        <View>
          <Label 
            question="Mettez-vous la main devant la bouche lorsque vous riez ou souriez ?"
            statement={mainDevantBoucheSourire}
            isArray={false}
            conditional={false}
          />
          <RadioComponent
            valueState={mainDevantBoucheSourire}
            setValueToTrue={()=>setValueToTrue("mainDevantBoucheSourire")}
            setValueToFalse={()=>setValueToFalse("mainDevantBoucheSourire")}
          />
        </View>

        <View>
          <Label
            question="Si vous aviez la possibilité de changer votre sourire, aimeriez-vous changer quelque chose ?"
            statement={souhaitsChangementOuiNon}
            isArray={false}
            conditional={false}
          />
          <RadioComponent
            valueState={souhaitsChangementOuiNon}
            setValueToTrue={()=>setValueToTrue("souhaitsChangementOuiNon")}
            setValueToFalse={setSourireChangementToFalse}
          />
          <TextAreaInput
            values={values}
            setValues={setValues}
            question="Décrivez tout ce que vous aimeriez changer :"
            textState = {souhaitsChangement}
            ouiNonState ={souhaitsChangementOuiNon}
            keyName="souhaitsChangement"
          />
          
        </View>
      </View>  
    </View>
  );
};

export default Esthetique;

const styles = StyleSheet.create({});
