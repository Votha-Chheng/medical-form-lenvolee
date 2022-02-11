import { View } from 'react-native';
import React from 'react';
import SubTitles from './SubTitles';
import { globalStyles } from '../globalStyles';
import Label from './Label';
import RadioComponent from './RadioComponent';
import HabitudesCheckBoxes from './HabitudesCheckBoxes';

const Habitudes = ({values, setValues}) => {

  const {habitudes, mauvaiseHaleine} = values

  const setMauvaiseHaleineToTrue = ()=>{
    setValues({...values, mauvaiseHaleine:true})
  }
  const setMauvaiseHaleineToFalse = ()=>{
    setValues({...values, mauvaiseHaleine:false})
  }

  return (
    <View style={globalStyles.container}>
      <SubTitles title="HABITUDES" />
      <View>
        <View>
          <HabitudesCheckBoxes 
            arrayState={habitudes} values={values} keyName="habitudes" setValues={setValues} />
        </View>
        <View style={{marginTop:-35}}>
          <Label 
            question="Avez-vous l’impression d’avoir une mauvaise haleine ou un mauvais goût dans la bouche ?"
            statement={mauvaiseHaleine}
            isArray={false}
          />
          <RadioComponent
            valueState ={mauvaiseHaleine}
            setValueToTrue={setMauvaiseHaleineToTrue}
            setValueToFalse={setMauvaiseHaleineToFalse}
          />
        </View>
      </View>  
    </View>
  );
};

export default Habitudes;

