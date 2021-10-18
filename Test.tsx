import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useDerivedValue,
  withSpring,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {bottom as GBottom, top as GTop} from '@constants';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const itemSize = (windowWidth - 48) / 2;

function ChatHeads() {
  const transX = useSharedValue(0);
  const transY = useSharedValue(0);
  const isDraging = useSharedValue(0);
  const initX = useSharedValue(0);
  const initY = useSharedValue(0);

  type AnimatedGHContext = {
    initialX: number;
    initialY: number;
  };
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: (event, ctx) => {
      ctx.initialX = transX.value;
      ctx.initialY = transY.value;
      initX.value = event.x - 20;
      initY.value = event.y - 20;
    },
    onActive: (event, ctx) => {
      transX.value = ctx.initialX + event.translationX + initX.value;
      transY.value = ctx.initialY + event.translationY + initY.value;
      isDraging.value = withTiming(1);
    },
    onEnd: (event) => {
      const width = windowWidth - itemSize; // minus margins & width
      const height = windowHeight - GTop - GBottom - itemSize; // minus margins & height
      const toss = 0.2;
      function clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
      }
      const targetX = clamp(transX.value + toss * event.velocityX, 0, width);
      const targetY = clamp(transY.value + toss * event.velocityY, 0, height);

      const top = targetY;
      const bottom = height - targetY;
      const left = targetX;
      const right = width - targetX;
      const minDistance = Math.min(top, bottom, left, right);
      let snapX = targetX;
      let snapY = targetY;
      switch (minDistance) {
        case top:
          snapY = 0;
          break;
        case bottom:
          snapY = height;
          break;
        case left:
          snapX = 0;
          break;
        case right:
          snapX = width;
          break;
      }
      if (snapY === height) {
        isDraging.value = withTiming(2);
        transX.value = withSpring(snapX, {velocity: event.velocityX});
        transY.value = withSpring(snapY + itemSize - 80, {velocity: event.velocityY});
      } else {
        isDraging.value = withTiming(0);
        transX.value = withSpring(0, {velocity: event.velocityX});
        transY.value = withSpring(0, {velocity: event.velocityY});
      }
    },
  });

  const stylez = useAnimatedStyle(() => {
    return {
      width: interpolate(isDraging.value, [0, 1, 2], [itemSize, 40, 80]),
      borderRadius: interpolate(isDraging.value, [0, 1, 2], [0, 20, 12]),
      transform: [{translateX: transX.value}, {translateY: transY.value}],
    };
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[{aspectRatio: 1, backgroundColor: 'black'}, stylez]} />
      </PanGestureHandler>
    </>
  );
}

function Main(): React.ReactElement {
  return (
    <View style={{flex: 1, marginTop: GTop, marginBottom: GBottom, backgroundColor: 'pink'}}>
      <ChatHeads />
    </View>
  );
}

export default Main;
