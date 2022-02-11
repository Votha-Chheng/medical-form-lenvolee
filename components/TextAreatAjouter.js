import { Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { globalStyles } from '../globalStyles'
import Label from './Label'
import RadioComponent from './RadioComponent'

const TextAreatAjouter = ({
  values, 
  setValues, 
  questionOuiNon, 
  questionDescription, 
  inputPlaceholder, 
  stateOuiNon, 
  stateOuiNonToString, 
  stateNext, 
  stateNextToString,
  unconditional
}) => {
  const [input, setInput] = useState("")

  const setValueToTrue = (keyName, secondKeyName)=>{
    setValues({...values, [keyName]:true, [secondKeyName]:undefined})
  }

  const setValueToFalse = (stateOuiNonToString, stateNextToString)=>{
    setValues({...values, [stateOuiNonToString] : false, [stateNextToString]:""})
    setInput("")
  }

  const handleValidateChangement = (stateNextToString)=>{
    setValues({...values, [stateNextToString]: input })
  }

  return (
    <View>
      {
        !unconditional &&
        <View>
          <Label
            question={questionOuiNon}
            statement={stateOuiNon}
          />
          <RadioComponent
            valueState={stateOuiNon}
            setValueToTrue={()=>setValueToTrue(stateOuiNonToString, stateNextToString)}
            setValueToFalse={()=>setValueToFalse(stateOuiNonToString, stateNextToString)}
          />
        </View>
        
      }
      
      {
        (stateOuiNon || unconditional) &&
        <View>
          <Label
            question={questionDescription}
            statement={stateNext}  
          />
          {
            stateNext === undefined ?
            <View>
              <TextInput
                style={[globalStyles.input, {width:"90%", height:90, textAlignVertical:"top", paddingVertical:10}]}
                placeholder={inputPlaceholder}
                multiline = {true}
                numberOfLines = {5}
                value={input}
                onChangeText={(text)=>setInput(text)}
              />
              <Button
                mode="contained"
                labelStyle={{fontSize:20}}
                style={{marginLeft:7.5, width:200, backgroundColor:"#3798e8"}}
                onPress={()=>handleValidateChangement(stateNextToString)}
              >
                AJOUTER
              </Button>
            </View>
            :
            <View>
              <View style={{justifyContent:"flex-start"}}>
                <Text style={{padding:5, backgroundColor:"#eeeeee", fontSize:20, fontWeight:"bold", color:"green", width:500}}>
                  {stateNext}
                </Text>
              </View>
              <Button
                uppercase
                mode="contained"
                labelStyle={{fontSize:20}}
                style={{marginLeft:7.5, width:200, backgroundColor:"orange"}}
                onPress={()=>setValues({...values, [stateNextToString]: undefined })}
              >
                Modifier
              </Button>
            </View>
          }
        </View>
      }
    </View>
  )
}

export default TextAreatAjouter
