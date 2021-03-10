import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  scrollTo,
  useDerivedValue,
  useAnimatedRef,
} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const indices = [0, 1, 2, 3];
const range = [0, 9999];
const dotSize = 40;

const ScrollToScreen: React.FC = () => {
  const progress = useSharedValue(0);
  const number = useDerivedValue(() => {
    const val = range[0] + Math.round(progress.value * (range[1] - range[0]));
    return val;
  });

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center'}}>
        <NumberDisplay number={number} />
        <Text>move dot</Text>
        <View>
          <ProgressBar progress={progress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const GetDigit = (number: Animated.SharedValue<number>, i: number): Animated.SharedValue<number> => {
  return useDerivedValue(() => {
    return Math.floor(number.value / 10 ** i) % 10;
  });
};

const NumberDisplay: React.FC<TPropsNumberDisplay> = ({number}) => {
  return (
    <View style={{height: 400, width: 200}}>
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {indices.map((i) => {
          return <Digit digit={GetDigit(number, i)} key={i} />;
        })}
      </View>
    </View>
  );
};

const Digit: React.FC<TPropsDigit> = ({digit}) => {
  const aref = useAnimatedRef<ScrollView>();

  useDerivedValue(() => {
    scrollTo(aref, 0, digit.value * 200, true);
  });

  return (
    <View style={{height: 200}}>
      <ScrollView ref={aref}>
        {digits.map((i) => {
          return (
            <View
              style={{
                height: 200,
                alignItems: 'center',
                flexDirection: 'row',
              }}
              key={i}
            >
              <Text style={{fontSize: 30}}>{i}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const ProgressBar: React.FC<TPropsProgressBar> = ({progress}) => {
  const x = useSharedValue(0);
  const max = useSharedValue(0);

  const handler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {x: number}>({
    onStart: (_, ctx) => {
      ctx.x = x.value;
    },
    onActive: (e, ctx) => {
      let newVal = ctx.x + e.translationX;
      newVal = Math.min(max.value, newVal);
      newVal = Math.max(0, newVal);
      x.value = newVal;
    },
    onEnd: (_) => {
      progress.value = x.value / max.value;
    },
  });

  const stylez = useAnimatedStyle(() => ({transform: [{translateX: x.value}]}));
  const barStyle = useAnimatedStyle(() => ({width: max.value}));

  return (
    <View style={{height: 100, paddingRight: 80, paddingLeft: 40, width: 300}}>
      <View
        onLayout={(e) => {
          max.value = e.nativeEvent.layout.width;
        }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: 'black',
              height: 2,
              marginRight: 20,
              transform: [{translateY: dotSize / 2 + 1}, {translateX: dotSize / 2}],
            },
            barStyle,
          ]}
        />
        <PanGestureHandler onGestureEvent={handler}>
          <Animated.View style={[styles.dot, stylez]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default ScrollToScreen;

type TPropsProgressBar = {
  progress: Animated.SharedValue<number>;
};

type TPropsNumberDisplay = {
  number: Animated.SharedValue<number>;
};

type TPropsDigit = {
  digit: Animated.SharedValue<number>;
};

const styles = StyleSheet.create({
  dot: {
    borderRadius: 100,
    backgroundColor: 'black',
    width: dotSize,
    height: dotSize,
  },
});
