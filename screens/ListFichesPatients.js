import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { globalStyles } from '../globalStyles'
import { Button } from 'react-native-paper'
import { displayDateNormal, getHTML } from '../utils'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing'

const ListFichesPatients = () => {
  const [listePatients, setListePatients] = useState([])

  useEffect(()=>{
    searchPatienteleInAsyncStorage()
  },[])

  const searchPatienteleInAsyncStorage = async()=>{
    try{
      const arrayPatienteleJSON = await AsyncStorage.getItem('Patientèle')

      const arrayPatientele = JSON.parse(arrayPatienteleJSON)

      setListePatients(arrayPatientele)

      console.log("listePatients :", listePatients)

      return
      
    } catch (error){
      console.log(error)
    }
  }

  const printPDF = async (values) => {
    await Print.printAsync({
      html : getHTML(values),
    });
  }

  const exportFile = async (values) => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html : getHTML(values)
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }


  return (
    <View style={{maxWidth:"100%"}}>
      <Text style={{fontSize:30, fontWeight:'bold', textAlign:"center", marginVertical:30}}>
        Liste des Fiches Patients
      </Text>
      <View style={{alignItems:'center'}}>
        {
          listePatients!==null && listePatients.reverse().map((liste, index)=>(
            <View 
              key={index.toString()}
              style={[globalStyles.flexRow, {marginBottom:20}]}
            >
              <View style={[styles.bandeau,{backgroundColor:`${index%2 === 0 ? "#4b8095" : "#dbe9ee"}`, alignItems:"center"}]}>
                <Text style={[styles.nom, { color:`${index%2===0 ? "#fff":"#4b8095"}`}]}>
                  {liste.nom.toUpperCase()} {liste.prenom}
                </Text>
                <Text style={{marginHorizontal:5, color:`${index%2===0 ? "#fff":"#4b8095"}`, fontSize:20}}>
                  venu le {displayDateNormal(new Date(liste.dateRdv).toDateString())}
                </Text>
              </View>
              <View>
                <Button
                  mode='contained'
                  style={{backgroundColor:'orange', marginBottom:5}}
                  onPress={()=>printPDF(liste)}
                >
                  Enregistrer le PDF
                </Button>
                <Button
                  mode='contained'
                  style={{marginTop:5}}
                  onPress={()=>exportFile(liste)}
                >
                  Exporter le PDF
                </Button>
              </View>
            </View>  
          ))
        }

      </View>
    </View>
  )
}

export default ListFichesPatients

const styles = StyleSheet.create({
  bandeau : {
    paddingVertical:2.5,
    paddingHorizontal:7.5,
    borderRadius:3,
    marginRight:5,
    height:80,
    justifyContent:'center'
  },
  nom : {
    fontSize:22.5, 
    fontWeight:"bold",
    marginRight:5
  }
})