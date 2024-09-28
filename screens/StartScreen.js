import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../utils/ColorUtil.js';
import React, { useState } from 'react';
import Card from '../components/Card';
import CustomButton from '../components/Button';
import styling from '../utils/StyleUtil.js';

export default function StartScreen( {onRegister} ) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  // error states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumError, setPhoneNumError] = useState('');

  // input validation
  function validateName (text) {
    if (!/^[a-zA-Z ]+$/.test(text) || text.length < 2) {
      setNameError('Name must be at least 2 characters long non-numeric');
    } else {
      setNameError('');
    }
    setName(text);
  }

  function validateEmail (text) {
    if (!/^\S+@\S+\.\S+$/.test(text)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
    setEmail(text);
  }

  function validatePhoneNum (text) {
    if (
      text.length !== 10 
      || isNaN(text) 
      || text.charAt(text.length - 1) === '0' 
      || text.charAt(text.length - 1) === '1') {
        setPhoneNumError('Invalid phone number');
      } else {
        setPhoneNumError('');
      }
    setPhoneNum(text);
  }

  // reset button
  function handleReset () {
    setName('');
    setEmail('');
    setPhoneNum('');
    setIsChecked(false);
    setNameError('');
    setEmailError('');
    setPhoneNumError('');
  }

  function handleRegisterPress () {
    if (
      nameError 
      || emailError 
      || phoneNumError
      || !name
      || !email
      || !phoneNum
    ) {
      Alert.alert("Invalid Input", 'Please check the input values');
    } else {
      const userInfo = {
        name: name,
        email: email,
        phoneNum: phoneNum
      }
      onRegister(userInfo);
    }
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        {/* Name Input */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter your name"
          onChangeText={validateName}
          value={name}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        {/* Email Input */}
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter your email"
          onChangeText={validateEmail}
          value={email}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Phone Number Input */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Please Enter your phone number"
          onChangeText={validatePhoneNum}
          value={phoneNum}
        />
        {phoneNumError ? <Text style={styles.errorText}>{phoneNumError}</Text> : null}

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>I am not a robot</Text>
        </View>

        <View style={styles.buttonContainer}>
            <CustomButton
                customStyle={styles.resetButton}
                textStyle={styles.resetButtonText}
                title="Reset"
                onPress={handleReset}
            />
            <CustomButton
                customStyle={styles.registerButton}
                textStyle={[
                    styles.registerButtonText,
                    { color: isChecked ? colors.blue : colors.darkGray }
                ]}
                title="Register"
                onPress={handleRegisterPress}
                disabled={!isChecked}
            />
        </View>
      </Card>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    // with only bottom border
    borderBottomWidth: 1,
    // borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: styling.rowDirection,
    justifyContent: styling.spaceBetween,
  },
  resetButton: {
    padding: styling.mediumPadding,
    borderRadius: styling.smallBorderRadius,
  },
  resetButtonText: {
    fontSize: styling.mediumFontSize,
    color: colors.deepPink,
  },
  registerButton: {
    padding: styling.mediumPadding,
    borderRadius: styling.smallBorderRadius,
  },
  registerButtonText: {
    fontSize: styling.mediumFontSize,
    color: colors.blue,
  },
});