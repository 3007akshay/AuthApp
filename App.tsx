// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './navigation/AppNavigator';
// import { initDB } from './database/db';
// import { useEffect } from 'react';

// export default function App() {
//   useEffect(() => {
//     initDB();
//   }, []);
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// }


import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { initDB } from './database/db';
import { getSession, isSessionValid } from './utils/session';

export default function App() {
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Dashboard'>('Login');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await initDB();

      const session = await getSession();

      if (session && isSessionValid(session.loginTime)) {
        setUser(session.user);
        setInitialRoute('Dashboard');
      } else {
        setInitialRoute('Login');
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <AppNavigator initialRoute={initialRoute} user={user} />
    </NavigationContainer>
  );
}