import { View, Text } from 'react-native';
import { globalStyles } from '../globalStyles';
import CheckBoxComponent from './CheckBoxComponent';

const DiseasesCheckboxes = ({values, setValues}) => {

  const {maladies} = values

  const handleChangeValues = (isChecked, disease)=>{
    if(isChecked){
      setValues({...values, maladies:[...maladies, disease]})

    } else if(!isChecked){
      let temp = maladies.filter(item => item !== disease)
      setValues({...values, maladies:temp})

    }
  }
  
  return (
    <View style={{marginLeft:10}}>
      <Text style={globalStyles.label}>
        &#8227; Merci de cocher chacune des maladies ou problèmes que vous avez pu avoir par le passé ou que vous avez actuellement :
      </Text>
      <View style={globalStyles.flexRow}>
        <View style={{marginRight:30}}>
          <CheckBoxComponent title="Antidépresseurs" checkedList={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Maladie du foie" maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Prothèses non-dentaires" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Asthme" maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Maladie cardiaque" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Rhumatisme aigu" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Chirugie esthétique" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Maladie du sang" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Thyroïde" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Diabète" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Hépatite" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Pertes de connaissance" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Troubles des reins" maladies={maladies} handleChangeValues={handleChangeValues}/>
        </View>
        <View style={{marginLeft:30}}>
          <CheckBoxComponent title="Lésions cardiaques congénitales " maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Problèmes circulatoires" maladies={maladies} handleChangeValues={handleChangeValues}/>
          <CheckBoxComponent title="Tumeur maligne" handleChangeValues={handleChangeValues} maladies={maladies} />
          <CheckBoxComponent title="HIV" maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Désordres hormonaux" maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Maladies vénériennes " maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Sinusites répétées" maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Œdèmes (gonflements) " maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Syncopes, vertiges" maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Glaucome" maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Pacemaker" maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Ulcères à l’estomac" maladies={maladies} handleChangeValues={handleChangeValues} />
          <CheckBoxComponent title="Problèmes nerveux " maladies={maladies} handleChangeValues={handleChangeValues} />
        </View>
      </View>
    </View>
  );
};


export default DiseasesCheckboxes;

