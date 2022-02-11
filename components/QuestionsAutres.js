import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { globalStyles } from '../globalStyles';

const QuestionsAutres = ({item, deleteFunction}) => {

  return (
    <TouchableOpacity
      style={[globalStyles.flexRow, {height:40, borderColor:"grey", borderWidth:1, marginLeft:10, marginTop:10, justifyContent:"space-between", flexWrap:"wrap", width:"auto"}]}
      onPress={deleteFunction}
    >
      <Text style={{fontSize : 20, fontWeight:"bold", marginHorizontal:5, marginTop:5, color:"green"}}>
        {item}
      </Text>
      <Text style={{color:"#fff", width:30, height:"100%", backgroundColor:"red", paddingLeft:9, fontSize : 20, fontWeight:"bold", paddingTop:5}}>
        X
      </Text>
    </TouchableOpacity>
  );
};

export default QuestionsAutres;
