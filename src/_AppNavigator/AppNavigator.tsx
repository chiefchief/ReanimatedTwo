import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Start,
  ColorSelection,
  LongPress,
  // ADD NEW SCREEN
} from '@screens';
import {navigationRef, onStateChange} from '@services';

const InitialStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Start" component={Start} />
    </AuthStack.Navigator>
  );
};

const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator initialRouteName={'LongPress'}>
      <HomeStack.Screen name="Start" component={Start} />
      <HomeStack.Screen name="ColorSelection" component={ColorSelection} options={{headerShown: false}} />
      <HomeStack.Screen name="LongPress" component={LongPress} options={{headerShown: false}} />
    </HomeStack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <InitialStack.Navigator screenOptions={{headerShown: false}}>
        {true ? (
          <InitialStack.Screen name="HomeNavigator" component={HomeNavigator} />
        ) : (
          <InitialStack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </InitialStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
