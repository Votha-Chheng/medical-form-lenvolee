import { View } from 'react-native';
import React from 'react';
import SubTitles from './SubTitles';
import { globalStyles } from '../globalStyles';
import RadioComponent from './RadioComponent';
import Label from './Label';
import TextAreatAjouter from './TextAreatAjouter';
import { useValuesContext } from '../providers/ValuesProvider';

const Esthetique = () => {

  const {values, setValues} = useValuesContext()

  const {
    dentsMemeCouleurs,
    souhaitDentsPlusBlanches,
    satisfactionDentsGencives,
    mainDevantBoucheSourire,
    souhaitsChangementOuiNon,
    souhaitsChangement
  } = values

  const setValueToTrue = (keyName, secondKeyName=null)=>{
    if(secondKeyName!==null){
      setValues({...values, [keyName]:true, [secondKeyName]:undefined})
    } else {
      setValues({...values, [keyName]:true})
    }
    
  }
  const setValueToFalse = (keyName)=>{
    setValues({...values, [keyName]:false})
  }


  return (
    <View style={[globalStyles.container, {marginBottom:25}]}>
      <SubTitles title="DENTISTERIE ESTH&Eacute;TIQUE" />
      <View style={{marginTop:15}}>
        <View>
          <Label 
            question="Dans un large sourire, vos dents sont-elles toutes de la même couleur ?"
            statement={dentsMemeCouleurs}
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

        <View style={{marginBottom:50}}>
          <TextAreatAjouter
            values={values}
            setValues={setValues}
            questionOuiNon="Si vous aviez la possibilité de changer votre sourire, aimeriez-vous changer quelque chose ?"
            questionDescription="Qu'aimeriez-vous changer dans votre sourire ?"
            inputPlaceholder="Décrivez tout ce que vous aimeriez changer "
            stateOuiNon={souhaitsChangementOuiNon}
            stateOuiNonToString ="souhaitsChangementOuiNon"
            stateNext = {souhaitsChangement}
            stateNextToString = "souhaitsChangement"
          />
        </View>
      </View>  
    </View>
  );
};

export default Esthetique;
