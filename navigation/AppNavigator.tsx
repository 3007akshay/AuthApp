import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';

// ✅ Navigation Types
export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  Dashboard: { user: any };
};

// ✅ Props for session-based navigation
type Props = {
  initialRoute: 'Login' | 'Dashboard';
  user?: any;
};

const Stack = createStackNavigator<RootStackParamList>();

// ✅ Updated Navigator with Props
const AppNavigator: React.FC<Props> = ({ initialRoute, user }) => {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      
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
        initialParams={{ user }}
        options={{ title: 'Dashboard', headerLeft: () => null }}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;