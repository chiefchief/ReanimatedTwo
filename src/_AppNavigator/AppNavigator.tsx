import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Start,
  ColorSelection,
  LongPress,
  SwipeButton,
  Breathe,
  DragAndDrop,
  Duolingo,
  LiquidSwipe,
  MoveSongList,
  SwipeToDelete,
  RotaryLogin,
  RippleEffect,
  Tarot,
  Switch,
  RingWaveIndicator,
  ScrollToIndex,
  PerspectiveMenu,
  // ADD NEW SCREEN
} from '@screens';
import {navigationRef, onStateChange} from '@services';

const InitialStack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator initialRouteName={'PerspectiveMenu'}>
      <HomeStack.Screen name="Start" component={Start} />
      <HomeStack.Screen name="ColorSelection" component={ColorSelection} options={{headerShown: false}} />
      <HomeStack.Screen name="LongPress" component={LongPress} />
      <HomeStack.Screen name="SwipeButton" component={SwipeButton} />
      <HomeStack.Screen name="Breathe" component={Breathe} />
      <HomeStack.Screen name="DragAndDrop" component={DragAndDrop} />
      <HomeStack.Screen name="Duolingo" component={Duolingo} />
      <HomeStack.Screen name="LiquidSwipe" component={LiquidSwipe} />
      <HomeStack.Screen name="MoveSongList" component={MoveSongList} options={{headerShown: false}} />
      <HomeStack.Screen name="SwipeToDelete" component={SwipeToDelete} />
      {/* FIX -> */}
      <HomeStack.Screen name="RotaryLogin" component={RotaryLogin} />
      <HomeStack.Screen name="RippleEffect" component={RippleEffect} />
      <HomeStack.Screen name="Tarot" component={Tarot} />
      <HomeStack.Screen name="Switch" component={Switch} />
      <HomeStack.Screen name="RingWaveIndicator" component={RingWaveIndicator} />
      <HomeStack.Screen name="ScrollToIndex" component={ScrollToIndex} options={{headerShown: false}} />
      <HomeStack.Screen name="PerspectiveMenu" component={PerspectiveMenu} options={{headerShown: false}} />
    </HomeStack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <InitialStack.Navigator screenOptions={{headerShown: false}}>
        <InitialStack.Screen name="HomeNavigator" component={HomeNavigator} />
      </InitialStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
