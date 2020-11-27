import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfileScreen from './EditProfileScreen';
import MapTestScreen from './MapTestScreen';
//import { useTheme } from '@react-navigation/native';
import {Avatar, useTheme} from 'react-native-paper';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#fff"
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Ionicons name="aperture" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
)

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => {
  const {colors} = useTheme();
  
  return(
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          //shadowColor: '#fff',  //to remove the top tab line for iOS
          elevation: 0, //to remove the top tab line for android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'FoodFinder',
        headerLeft: () => (
          <TouchableOpacity 
            style={{margin: 16}}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons 
              name="menu" 
              size={25} 
              backgroundColor={colors.background}
              color={colors.text}  
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity 
              style={{margin: 16}}
              onPress={() => {}}
            >
              <Ionicons 
                name="search" 
                size={25} 
                backgroundColor={colors.background}
                color={colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{paddingHorizontal: 18, marginTop:12}}
              onPress={() => navigation.navigate('Profile')}
            >
              <Avatar.Image 
                source={{
                  uri: 'https://media-exp1.licdn.com/dms/image/C4D03AQF-Aj-3gEkDZA/profile-displayphoto-shrink_200_200/0?e=1610582400&v=beta&t=D42LncBfV4jAetNbU41PA4zs4358hGclTQWk0BDpl0g'
                }}
                size={35}
              />
            </TouchableOpacity>
          </View>
        )
      }}/>

      <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={({route}) => ({
          //title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        })}
      />
    </HomeStack.Navigator>
  );
};

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#1f65ff'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}
>
  <DetailsStack.Screen name="Notifications" component={DetailsScreen} options={{
    //title:'Overview'
    headerLeft: () => (
      <TouchableOpacity 
          style={{margin: 16}}
          onPress={() => navigation.openDrawer()}
      >
          <Ionicons 
            name="menu" 
            size={25} 
            backgroundColor="#1f65ff"
            color="#fff"   
          />
      </TouchableOpacity>
      // <FontAwesome5.Button
      //   name="bars" 
      //   size={25}
      //   backgroundColor="#009387"
      //   onPress={() => navigation.openDrawer()}
      // />
    )
   }} />
</DetailsStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();
  
  return(
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          //shadowColor: '#fff',  //to remove the top tab line for iOS
          elevation: 0, //to remove the top tab line for android
        },
        headerTintColor: colors.text,
        // headerTitleStyle: {
        //   fontWeight: 'bold'
        // }
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
        title:'',
        headerLeft: () => (
          <TouchableOpacity 
              style={{margin: 16}}
              onPress={() => navigation.openDrawer()}
          >
              <Ionicons 
                name="menu" 
                size={25} 
                backgroundColor={colors.background}
                color={colors.text} 
              />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity 
              style={{margin: 16}}
              onPress={() => navigation.navigate('EditProfile')}
          >
              <MaterialCommunityIcons 
                name="account-edit" 
                size={25} 
                backgroundColor={colors.background}
                color={colors.text}  
              />
          </TouchableOpacity>
        ),
      }} />
      <ProfileStack.Screen 
        name="EditProfile"
        options={{
          title: 'Edit Profile'
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

const ExploreStackScreen = ({navigation}) => (
<ExploreStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#d02860'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}
>
  <ExploreStack.Screen name="Explore" component={ExploreScreen} options={{
    //title:'Overview'
    headerLeft: () => (
      <TouchableOpacity 
          style={{margin: 16}}
          onPress={() => navigation.openDrawer()}
      >
          <Ionicons 
            name="menu" 
            size={25} 
            backgroundColor="#d02860"
            color="#fff"   
          />
      </TouchableOpacity>
      // <FontAwesome5.Button
      //   name="bars" 
      //   size={25}
      //   backgroundColor="#009387"
      //   onPress={() => navigation.openDrawer()}
      // />
    )
   }} />
</ExploreStack.Navigator>
);
