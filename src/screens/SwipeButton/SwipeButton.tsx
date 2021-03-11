import React from 'react';
import styles from './styles';
import MockUI from './MockUI';
import SWButton, {H_SWIPE_RANGE} from './SWButton';
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

const SwipeButton: React.FC = () => {
  const X = useSharedValue(0);

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const back = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(X.value, InterpolateXInput, ['#ebedee', '#222']),
    };
  });

  return (
    <Animated.View style={[styles.root, back]}>
      <MockUI />
      <SWButton X={X} />
      <MockUI />
    </Animated.View>
  );
};

export default SwipeButton;
