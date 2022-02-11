import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import { globalStyles } from '../globalStyles';

const OtherDiseases = ({values, setValues})=>{

  const [inputValue, setInputValue] = useState("")
  const [showNewValues, setShowNewValues] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [extraDiseases, setExtraDiseases] = useState([])

  const {maladies} = values

  useEffect(()=>{
    extraDiseases.length>0 ? setShowDelete(true) : setShowDelete(false)
  }, [extraDiseases])

  useEffect(()=>{
    extraDiseases.length === 0 && setDeleteMode(false)
  }, [extraDiseases])

  const validateNewDisease = ()=> {
    setExtraDiseases([...extraDiseases, inputValue])
    setValues({...values, maladies:[...maladies, inputValue]})
    setInputValue("")
    setShowNewValues(false)
  }

  const deleteDisease = (event)=>{
    let temp = extraDiseases.filter((disease) => disease !== (event._dispatchInstances.memoizedProps.children[0].props.children))
    let tempState = maladies.filter((disease) => disease !== (event._dispatchInstances.memoizedProps.children[0].props.children))
    setValues({...values, maladies: tempState})
    setExtraDiseases(temp)
  }

  return (
    <ScrollView style={[globalStyles.container, {marginBottom:15}]}>
      <View style={[globalStyles.flexRow, {flexWrap:"wrap"}]}>
        <Text style={[globalStyles.label, {marginTop:15}]}>
          Autres :
        </Text>
        <View style={[globalStyles.extraDiseases, globalStyles.flexRow, {flexWrap:"wrap"}]}> 
          {
            extraDiseases.length>0 ? 
            extraDiseases.map((disease, index)=> (
              <TouchableOpacity 
                key={index}
                style={
                  deleteMode 
                  ? 
                  [styles.deletable, { height:50, padding:5, marginLeft:10, marginBottom:2.5, borderRadius:5}] 
                  : 
                  [styles.noDelete, { height:50, padding:5, marginLeft:10, marginBottom:2.5, borderRadius:5}]}
                onPress={(event)=> deleteMode && deleteDisease(event)}
              >
                <Text style={{fontSize:20, color:"#fff", textAlign:"center", justifyContent:"center"}}>
                  {disease} 
                </Text>
              </TouchableOpacity>
            ))    
            : null
          }
        </View>
      </View>
      
      <View style={globalStyles.flexRow}>
        
        {
          showNewValues ?
          <View style={{flexDirection:'row'}}>
            <TextInput
              style={[globalStyles.input, {width:200}]}  
              onChangeText={(text)=>setInputValue(text)}
              placeholder='Ajouter'
            />
            <TouchableOpacity
              style={{backgroundColor:"orange", marginLeft:5, paddingHorizontal:5, paddingVertical:7.5, height:40, borderRadius:5}}
              onPress={()=>setShowNewValues(false)}
            >
              <Text style={{color:"white", fontSize:17.5}}>
                ANNULER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor:`${inputValue.length<1? "#e5e2de" :"green"}`, marginLeft:5, paddingHorizontal:10, paddingVertical:7.5, height:40, borderRadius:5}}
              onPress={validateNewDisease}
              disabled={inputValue.length<1}
            >
              <Text style={{color:"white", fontSize:17.5}}>
                VALIDER
              </Text>
            </TouchableOpacity>
          </View>
          :
          <View style={[globalStyles.flexRow, {marginBottom:0}]}>
            <TouchableOpacity
              style={{backgroundColor:`${deleteMode ? "#e5e2de": "#3798e8"}`, marginLeft:5, paddingHorizontal:10, paddingVertical:10, borderRadius:5}}
              onPress={()=>setShowNewValues(true)}
              disabled={deleteMode}
            >
              <Text style={{color:"white", fontSize:17.5}}>
                AJOUTER
              </Text>
            </TouchableOpacity>
            {
              showDelete ?
              <TouchableOpacity
                style={{backgroundColor:"#f79c09", marginLeft:5, paddingHorizontal:10, paddingVertical:10, borderRadius:5}}
                onPress={()=>setDeleteMode(prev=> !prev)}
              >
                <Text style={{color:"white", fontSize:17.5}}>
                  {deleteMode ? "FIN SUPPRESSION":"SUPPRIMER"}
                </Text>
              </TouchableOpacity>
              :
              null
            }
          </View>  
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  extraDiseases :{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  deletable : {
    backgroundColor:"red",
  },
  noDelete: {
    backgroundColor:"green",
  }
});

export default OtherDiseases