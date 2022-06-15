import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useValuesContext } from '../providers/ValuesProvider'

const MerciScreen = ({navigation}) => {

  const {resetValues} = useValuesContext()

  useEffect(()=>{
    resetValues()
    
    setTimeout(()=>{
      navigation.navigate("Accueil")
    }, 10000)
  }, [])

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={styles.text}>Merci d'avoir pris le temps de remplir ce questionnaire.</Text>
      <Text style={styles.text}>Veuillez remettre la tablette à notre Assistante à l'accueil.</Text>
    </View>
  )
}

export default MerciScreen

const styles = StyleSheet.create({
  text :{
    fontSize:40, 
    fontWeight:"bold", 
    textAlign:'center', 
    padding:7.5,
    color:"#363C51"
  }
})