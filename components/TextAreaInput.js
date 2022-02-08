import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../globalStyles';

const TextAreaInput = ({values, setValues, question, textState, ouiNonState, keyName}) => {

  const [input, setInput] = useState("")
  const [modifier, setModifier] = useState(false)

  const handleValidateChangement = ()=>{
    if(input.length>2){
      setValues({...values, [keyName]: input})
      setModifier(false)
    }
  }

  if(!modifier && textState.length>0){
    return (
      <View>
        <Text style={[globalStyles.label, {color:`${textState.length<1?"red":"black"}`}]}>
          &#8227; {question}
        </Text>
        <View style={{borderColor:"grey", borderWidth:1, padding:5, marginRight:10}}>
          <Text style={{fontSize:20, color:"green"}}>
            {textState}
          </Text>
        </View>
        <TouchableOpacity 
          style={{backgroundColor:"orange", height:40, width:125, paddingHorizontal:7.5, paddingTop:7}} 
          onPress={()=>setModifier(true)}>
          <Text style={{color:"#fff", fontSize:17.5, textAlign:'center'}}>
            MODIFIER
          </Text>
        </TouchableOpacity>
      </View>
    )
  } else if(modifier){
    return (
      <View>
        <Text style={[globalStyles.label, {color:"red"}]}>
          &#8227; {question}
        </Text>
        <TextInput
          style={[globalStyles.input, {width:"90%", height:90, textAlignVertical:"top"}]}
          placeholder={question}
          multiline = {true}
          numberOfLines = {5}
          value={input}
          onChangeText={(text)=>setInput(text)}
        />
        <TouchableOpacity 
          style={{
            backgroundColor:`${input.length>2 ? "green" : "#3798e8"}`, 
            height:40, 
            width:250, 
            paddingHorizontal:7.5, 
            paddingTop:7, 
            marginLeft:7.5, 
            marginRight:10
          }} 
          onPress={handleValidateChangement}>
          <Text style={{color:"#fff", fontSize:17.5, textAlign:'center'}}>
            VALIDER LA MODIFICATION
          </Text>
        </TouchableOpacity>
      </View>
    )
  } else if(ouiNonState && !textState){
    return (
      <View>
        <Text style={[globalStyles.label, {color:`${textState.length<1?"red":"black"}`}]}>
          &#8227; {question}
        </Text>
        <TextInput
          style={[globalStyles.input, {width:"90%", height:90, textAlignVertical:"top"}]}
          placeholder={question}
          multiline = {true}
          numberOfLines = {5}
          value={input}
          onChangeText={(text)=>setInput(text)}
        />
        <TouchableOpacity 
          style={{
            backgroundColor:`${input.length>2 ? "green" : "#3798e8"}`, 
            height:40, 
            width:125, 
            paddingHorizontal:7.5, 
            paddingTop:7, 
            marginLeft:7.5, 
            marginRight:10
          }} 
          onPress={handleValidateChangement}>
          <Text style={{color:"#fff", fontSize:17.5, textAlign:'center'}}>
            AJOUTER
          </Text>
        </TouchableOpacity>
      </View>
    )
  } else if(ouiNonState==="nonConditional" && !textState){
      <View>
        <Text style={[globalStyles.label, {color:`${textState.length<1?"red":"black"}`}]}>
          &#8227; {question}
        </Text>
        <TextInput
          style={[globalStyles.input, {width:"90%", height:90, textAlignVertical:"top"}]}
          placeholder={question}
          multiline = {true}
          numberOfLines = {5}
          value={input}
          onChangeText={(text)=>setInput(text)}
        />
        <TouchableOpacity 
          style={{
            backgroundColor:`${input.length>2 ? "green" : "#3798e8"}`, 
            height:40, 
            width:125, 
            paddingHorizontal:7.5, 
            paddingTop:7, 
            marginLeft:7.5, 
            marginRight:10
          }} 
          onPress={handleValidateChangement}>
          <Text style={{color:"#fff", fontSize:17.5, textAlign:'center'}}>
            AJOUTER
          </Text>
        </TouchableOpacity>
      </View>
  } else {
    return null
  }
};

export default TextAreaInput;

const styles = StyleSheet.create({});
