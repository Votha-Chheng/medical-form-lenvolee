import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { globalStyles } from '../globalStyles';

const Label = ({question, statement, isArray, conditional}) => {
  return (
    <Text style={ 
      isArray && conditional
      ? 
      [globalStyles.label, {color:`${statement.includes(undefined) ? "red":"black"}`}]
      :
      isArray && !conditional 
      ?
      [globalStyles.label, {color:`${statement.length<1 ? "red":"black"}`}]
      : 
      [globalStyles.label, {color:`${statement===undefined ? "red":"black"}`}]
    }>
      &#8227; {question} :
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({});
