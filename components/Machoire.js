import { View } from 'react-native';
import React from 'react';
import { globalStyles } from '../globalStyles';
import SubTitles from './SubTitles';
import RadioComponent from './RadioComponent';
import Label from './Label';
import { useValuesContext } from '../providers/ValuesProvider';

const Machoire = () => {

  const {values, setValues} = useValuesContext()
  
  const {
    serrementGrincementDents,
    craquementClaquementDouleurOuvertureMachoire,
    difficulteAvalerMacherCoteUnique
  } = values

  const setValueToTrue = (keyName)=>{
    setValues({...values, [keyName]: true})
  }
  const setValueToFalse = (keyName)=>{
    setValues({...values, [keyName]: false})
  }

  return (
    <View style={globalStyles.container}>
      <SubTitles title="MÂCHOIRES" />
      <View>
        <View>
          <Label
            question="Serrez-vous ou grincez-vous des dents ?"
            statement={serrementGrincementDents}
          />
          <RadioComponent
            valueState ={serrementGrincementDents}
            setValueToTrue={()=>setValueToTrue("serrementGrincementDents")}
            setValueToFalse={()=>setValueToFalse("serrementGrincementDents")}
          />
        </View>
        <View>
          <Label
            question="Avez-vous remarqué des craquements, des claquements ou une douleur à l’ouverture de la mâchoire ?"
            statement={craquementClaquementDouleurOuvertureMachoire}
          />
          <RadioComponent
            valueState ={craquementClaquementDouleurOuvertureMachoire}
            setValueToTrue={()=>setValueToTrue("craquementClaquementDouleurOuvertureMachoire")}
            setValueToFalse={()=>setValueToFalse("craquementClaquementDouleurOuvertureMachoire")}
          />
        </View>

        <View>
          <Label
            question="Avez-vous des difficultés à avaler, à mâcher ou ne mâchez-vous fréquemment que d’un seul côté ?"
            statement={difficulteAvalerMacherCoteUnique}
          />
          <RadioComponent
            valueState ={difficulteAvalerMacherCoteUnique}
            setValueToTrue={()=>setValueToTrue("difficulteAvalerMacherCoteUnique")}
            setValueToFalse={()=>setValueToFalse("difficulteAvalerMacherCoteUnique")}
          />
        </View>
      </View>
    </View>
  );
};

export default Machoire;

