import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

  const getHtml = (values)=>{
    return (
      ``
    )
  }

  return (
    <View>
      <Text style={{fontSize:30, fontWeight:'bold', textAlign:"center", marginVertical:30}}>
        Liste des Fiches Patients
      </Text>
      <View>
        <Text>
          {
            listePatients!==null && listePatients.reverse().map((liste, index)=>(
              <Text key={index.toString()}>
                {liste.nom}
              </Text>
            ))
            // listePatients !==null &&
            // listePatients.map((liste, index)=>(
            //   <View key={index.toString()}>
            //     <Text>{liste.nom} {liste.prenom}</Text>
            //     <View>
            //       <Text>
            //         Date de consultation : 
            //       </Text>
            //     </View>
            //     <View>
            //       <Text>
            //         {liste.dateRdv.split("T")[0]}
            //       </Text>
            //     </View>
            //   </View>
            // ))
          }
        </Text>
      
      </View>
    </View>
  )
}

export default ListFichesPatients

const styles = StyleSheet.create({})