/**
 *
 * https://youtu.be/D-C7lLQ1oAk
 *
 */
import React, {useCallback} from 'react';
import {Dimensions} from 'react-native';
import {GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BACKGROUND_COLOR = '#1e1e23';
const THRESHOLD = SCREEN_WIDTH / 3;

export default function App() {
  const translateX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {x: number}>({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      // I forgot to wrap the translationX with Math.max in the video :/
      // It must be done in order to clamp the right axis scroll
      translateX.value = Math.max(event.translationX + context.x, 0);
    },
    onEnd: () => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [0, SCREEN_WIDTH / 2], [0, 3], Extrapolate.CLAMP);

    const borderRadius = interpolate(translateX.value, [0, SCREEN_WIDTH / 2], [0, 15], Extrapolate.CLAMP);

    return {
      borderRadius,
      transform: [
        {perspective: 100},
        {
          translateX: translateX.value,
        },
        {
          rotateY: `-${rotate}deg`,
        },
      ],
    };
  }, []);

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(SCREEN_WIDTH / 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[{backgroundColor: 'white', flex: 1}, rStyle]}>
          <Feather
            name="menu"
            size={32}
            color={BACKGROUND_COLOR}
            style={{margin: 15, marginTop: 44 + 15, position: 'absolute'}}
            onPress={onPress}
          />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
