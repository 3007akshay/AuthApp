import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { registerUser } from '../database/db';

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // ✅ Basic Validation
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password.length < 4) {
      Alert.alert('Error', 'Password must be at least 4 characters');
      return;
    }

    // ✅ Call DB Function
    const result = await registerUser(name, email, password);

    if (result.success) {
      Alert.alert('Success', 'Account created successfully');
      navigation.replace('Login'); // go to login
    } else {
      Alert.alert('Error', 'User already exists or something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Create Account" onPress={handleSignUp} />

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
};

export default SignUpScreen;

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: 'blue'
  }
});