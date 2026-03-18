import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';

// ✅ Define Types for Navigation
export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  Dashboard: { user: any };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ title: 'Create Account' }}
      />
      
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login' }}
      />
      
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ title: 'Dashboard', headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;