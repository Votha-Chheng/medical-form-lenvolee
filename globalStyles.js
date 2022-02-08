import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container : {
    paddingLeft:10,
    paddingTop: 10
  },
  label : {
    fontSize : 20,
    fontWeight:"bold",
    marginBottom:10,
    paddingRight:10,
    letterSpacing:0.75
  },
  flexRow : {
    flexDirection:"row", 
    alignItems:"center",
    marginBottom:20
  },
  input : {
    height:40,
    fontSize:20, 
    paddingHorizontal:5, 
    marginLeft:7.5, 
    borderWidth:1
  }
});

