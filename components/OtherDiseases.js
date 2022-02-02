import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';

const OtherDiseases = (values, setValues, focusedColor, focusBorderColor, blurBorderColor)=>{

  const [inputValue, setInputValue] = useState("")
  const [showNewValues, setShowNewValues] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [extraDiseases, setExtraDiseases] = useState([])

  useEffect(()=>{
    extraDiseases.length>0 ? setShowDelete(true) : setShowDelete(false)
  }, [extraDiseases])

  useEffect(()=>{
    extraDiseases.length === 0 && setDeleteMode(false)
  }, [extraDiseases])

  const validateNewDisease = ()=> {
    let arrayDisease = [...extraDiseases, inputValue]
    setExtraDiseases(arrayDisease)
    setShowNewValues(false)
  }

  const deleteDisease = (event)=>{
    let temp = extraDiseases.filter((disease) => disease !== (event._dispatchInstances.memoizedProps.children[0].props.children).toString())
    setExtraDiseases(temp)
  }

  return (
    <ScrollView style={{marginBottom:15}}>
      <Text style={[styles.label, {marginTop:15}]}>
        Autres :
      </Text>
    
      <View style={styles.flexRow}>
        {
          showNewValues ?
          <View style={{flexDirection:'row'}}>
            <TextInput
              style={[styles.input, {borderColor:`${focusedColor}`}]} 
              onFocus={focusBorderColor}
              onBlur={blurBorderColor} 
              onChangeText={(text)=>setInputValue(text)}
              placeholder='Ajouter'
            />
            <TouchableOpacity
              style={{backgroundColor:"orange", marginLeft:5, paddingHorizontal:5, paddingVertical:10}}
              onPress={()=>setShowNewValues(false)}
            >
              <Text style={{color:"white", fontSize:17.5}}>
                ANNULER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor:`${inputValue.length<1? "#e5e2de" :"green"}`, marginLeft:5, paddingHorizontal:10, paddingVertical:10}}
              onPress={validateNewDisease}
              disabled={inputValue.length<1}
            >
              <Text style={{color:"white", fontSize:17.5}}>
                VALIDER
              </Text>
            </TouchableOpacity>
          </View>
          :
          <View style={[styles.flexRow, {marginBottom:0}]}>
            <TouchableOpacity
              style={{backgroundColor:`${deleteMode ? "#e5e2de": "#3798e8"}`, marginLeft:5, paddingHorizontal:10, paddingVertical:10}}
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
                style={{backgroundColor:"#f79c09", marginLeft:5, paddingHorizontal:10, paddingVertical:10}}
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
      <View style={styles.extraDiseases}> 
        {
          extraDiseases.length>0 ? 
          extraDiseases.map((disease, index)=> (
            <TouchableOpacity 
              key={index}
              style={deleteMode ? [styles.deletable, {width:200, height:40, padding:5, marginLeft:10}] : [styles.noDelete, {width:200, height:40, padding:5, marginLeft:10}]}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label : {
    fontSize : 20,
    fontWeight:"bold",
    marginBottom:10,
    paddingRight:10,
    letterSpacing:0.75
  },
  input:{
    width:200, 
    fontSize:20, 
    padding:5, 
    marginLeft:5, 
    borderWidth:2
  },
  extraDiseases :{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  flexRow : {
    flexDirection:"row", 
    alignItems:"center",
    marginBottom:20
  },
  deletable : {
    backgroundColor:"red",
  },
  noDelete: {
    backgroundColor:"green",
  }
});

export default OtherDiseases