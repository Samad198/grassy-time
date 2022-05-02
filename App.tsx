import React, { useState, useEffect } from 'react';
import { StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Login from './Pages/Login.native';
import Register from './Pages/Register.native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import { SafeAreaProvider } from 'react-native-safe-area-context';
import Stats from './Pages/Stats.native';
import Home from './Pages/Home.native';
import Settings from './Pages/Settings.native';
import CreateEntry from './Pages/CreateEntry.native';


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

const HomeStack: React.FC<{
}> = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="CreateEntryScreen" component={CreateEntry} />
    </Stack.Navigator>
  );
};

const AuthedTabs: React.FC<{
}> = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
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
          <AuthedTabs />
        }
      </NavigationContainer>
    </SafeAreaProvider>
  );

};

const styles = StyleSheet.create({
});

export default App;
