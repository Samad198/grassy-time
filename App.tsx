import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import auth, {FirebaseAuthTypes } from '@react-native-firebase/auth';


import Login from './Pages/Login.native';
import Register from './Pages/Register.native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import { SafeAreaProvider } from 'react-native-safe-area-context';


const UnauthedStack: React.FC<{
}> = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const AuthedStack: React.FC<{
}> = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View><Text>This is what you would see when authed</Text></View>
  );
};

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();


  // Handle user state changes
  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (initializing) {
        setInitializing(false);
      }
    });
  }, []);

  if (initializing) return null;


  return (
    <SafeAreaProvider>
       <NavigationContainer>
      {!user ?
        <UnauthedStack />
        :
        <AuthedStack />
      }
      </NavigationContainer>
    </SafeAreaProvider>
  );

};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
