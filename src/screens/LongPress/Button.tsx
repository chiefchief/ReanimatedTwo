import {Icon} from '@components';
import {colors} from '@constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const SIZE = 150;
const STROKE_WIDTH = 10;
const ICON_SIZE = 96;
const CONTENT_SIZE = SIZE - STROKE_WIDTH * 2;

const Button: React.FC<TProps> = ({progress, active}) => {
  // useCode(() => {
  //   console.log('HERE');

  //   return cond(
  //     eq(progress.value, 1),
  //     call([], () => setActive(true)),
  //   );
  // }, [progress.value]);

  const animStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [0, ICON_SIZE]),
    };
  });

  // useDerivedValue(() => {
  //   'Worklet';
  //   if (progress.value === 1) {
  //     runOnJS(changeActive)();
  //   }
  // }, [progress]);

  return (
    <View style={styles.wrapper}>
      {/* <Animated.View style={[{width: 40, height: 40, backgroundColor: 'black'}, animStyles]} /> */}

      <View style={styles.container}>
        <Icon
          name={active ? 'check-circle' : 'fingerprint'}
          size={ICON_SIZE}
          color={active ? colors.blue_3884ff : colors.gray_f2f2f2}
          style={styles.icon}
        />
        <Animated.View style={[styles.activeIcon, animStyles, {opacity: active ? 0 : 1}]}>
          <Icon name="fingerprint" size={ICON_SIZE} color={colors.blue_3884ff} />
        </Animated.View>
      </View>
    </View>
  );
};

export default Button;

type TProps = {
  progress: Animated.SharedValue<number>;
  active: boolean;
};

const styles = StyleSheet.create({
  wrapper: {
    width: SIZE,
    aspectRatio: 1,
  },
  container: {
    position: 'absolute',
    top: STROKE_WIDTH,
    left: STROKE_WIDTH,
    right: STROKE_WIDTH,
    bottom: STROKE_WIDTH,
    backgroundColor: 'white',
    borderRadius: CONTENT_SIZE / 2,
    zIndex: 100,
  },
  icon: {
    top: (CONTENT_SIZE - ICON_SIZE) / 2,
    left: (CONTENT_SIZE - ICON_SIZE) / 2,
  },
  activeIcon: {
    position: 'absolute',
    top: (CONTENT_SIZE - ICON_SIZE) / 2,
    left: (CONTENT_SIZE - ICON_SIZE) / 2,
  },
});
