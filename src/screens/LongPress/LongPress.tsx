/**
 *
 * https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/the-10-min/src/TapGesture
 *
 */

import React, {useState} from 'react';
import {View} from '@components';
import styles from './styles';
import Animated, {withTiming, useSharedValue, useAnimatedStyle, interpolate, runOnJS} from 'react-native-reanimated';
import Button from './Button';
import {Pressable} from 'react-native';

/**
 *
 * TEST useDerivedValue - https://docs.swmansion.com/react-native-reanimated/docs/api/useDerivedValue
 *
 * useAnimatedReaction
 *
 */

const LongPress: React.FC = () => {
  const [active, setActive] = useState(false);
  const progress = useSharedValue(0);
  const [secondPress, setSecondPress] = useState(false);

  const setTrue = (isFinished?: boolean) => {
    if (isFinished) {
      setActive(true);
    }
  };
  const setSecond = (isFinished?: boolean) => {
    if (isFinished) {
      setSecondPress(false);
    }
  };

  const _onPressIn = () => {
    if (!active) {
      progress.value = withTiming(1, {duration: 2000}, isFinished => runOnJS(setTrue)(isFinished));
    }
    if (active && secondPress) {
      setActive(false);
    }
  };
  const _onPressOut = () => {
    if (active) {
      setSecondPress(true);
    } else {
      progress.value = withTiming(0, {duration: 400}, isFinished => runOnJS(setSecond)(isFinished));
      setActive(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {transform: [{scale: interpolate(progress.value, [0, 1], [1, 1.2])}]};
  });

  return (
    <View style={styles.container}>
      <Pressable onPressIn={_onPressIn} onPressOut={_onPressOut}>
        <Animated.View style={animatedStyle}>
          <Button progress={progress} active={active} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default LongPress;
