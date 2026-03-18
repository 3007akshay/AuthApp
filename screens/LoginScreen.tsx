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
import { loginUser } from '../database/db';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // ✅ Validation
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // ✅ DB Call
    const user = await loginUser(email, password);

    if (user) {
      Alert.alert('Success', 'Login successful');

      // ✅ Navigate with user data
      navigation.replace('Dashboard', { user });
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <Button title="Login" onPress={handleLogin} />

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('SignUp')}
      >
        Don’t have an account? Sign Up
      </Text>
    </View>
  );
};

export default LoginScreen;

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