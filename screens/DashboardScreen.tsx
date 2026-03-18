import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { updateUser } from '../database/db';
import { clearSession } from '../utils/session';

type DashboardRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

type DashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

type Props = {
  route: DashboardRouteProp;
  navigation: DashboardNavigationProp;
};

 const DashboardScreen: React.FC<Props> = ({ route, navigation }) => {
  const { user } = route.params;

  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);

  const handleUpdate = async () => {
    if (!name || !password) {
      Alert.alert('Error', 'Fields cannot be empty');
      return;
    }

    await updateUser(user.id, name, password);
    Alert.alert('Success', 'Profile updated');
  };

  const handleLogout = async () => {
    await clearSession();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name} 👋</Text>

      <Text style={styles.label}>Edit Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Edit Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Update Profile" onPress={handleUpdate} />

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default DashboardScreen;

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    marginBottom: 5,
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  }
});