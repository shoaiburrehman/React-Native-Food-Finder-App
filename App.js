/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { 
  NavigationContainer, 
  DarkTheme as NavigationDarkTheme, 
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './screens/MainTabScreen';
import { DrawerContent } from './screens/DrawerContent';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import RootStackScreen from './screens/RootStackScreen';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch(action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };            
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
   signIn: async(foundUser) => {
    //  setUserToken('abcd');
    //  setIsLoading(false);
    const userToken = String(foundUser[0].userToken);
    const userName = foundUser[0].username;
    try{
      await AsyncStorage.setItem('userToken', userToken)
    } catch(e){
      console.log(e);
    }
    //console.log('user token: ', userToken)
    dispatch({type: 'LOGIN', id: userName, token: userToken});
   },
   signOut: async() => {
    // setUserToken(null);
    // setIsLoading(false);
    try{
      await AsyncStorage.removeItem('userToken')
    } catch(e){
      console.log(e);
    }
    dispatch({type: 'LOGOUT'});
  },
  signUp: () => {
    setUserToken('abcd');
    setIsLoading(false);
  },
  toggleTheme: () => {
    setIsDarkTheme(isDarkTheme => !isDarkTheme);
  }
 }), []);

  useEffect(() => {
    setTimeout(async() => {
      //setIsLoading(false);
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken')
      } catch(e){
        console.log(e);
      }
      //console.log('user token: ', userToken)
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000); //you can increase the milisecond for loading by your own
  }, []);

  if( loginState.isLoading ){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView source={require('./assets/splash.json')} autoPlay loop />
        <Animatable.Text style={styles.splashTitle} animation="zoomIn">FoodFinder App</Animatable.Text>
        {/* <ActivityIndicator size="large" color="#009387" /> */}
      </View>
    )
  }

  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
      {loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} /> }>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="Support" component={SupportScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Bookmark" component={BookmarkScreen} />
        </Drawer.Navigator>
      ):(
        <RootStackScreen />
      )}
      </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashTitle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    marginTop: 280,
    fontWeight: "bold",
    color: '#009387'
  }
});

export default App;
