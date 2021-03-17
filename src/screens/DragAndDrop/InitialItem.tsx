import React, {useEffect} from 'react';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Image} from '@components';
import {width} from '@constants';
import {TInitialItem} from './itemsData';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';

const calcItemWidth = (width - 48) / 2;

const InitialItem: React.FC<TProps> = ({item, index, bottomY}) => {
  const translation = {x: useSharedValue(0), y: useSharedValue(0)};
  const initialPoints = {x: useSharedValue(0), y: useSharedValue(0), isActive: useSharedValue(false)};
  const isScroll = useSharedValue(0);
  const animation = useSharedValue(0);

  const TX = useDerivedValue(() => {
    const prevLP = initialPoints.x.value - 20;
    // const lastPoint = initialPoints.isActive.value ? initialPoints.x.value - 20 : calcItemWidth / 2 - 20;
    return translation.x.value + interpolate(isScroll.value, [0, 1], [0, prevLP]);
  }, [translation, initialPoints, isScroll]);
  const TY = useDerivedValue(() => {
    const prevLP = initialPoints.y.value - 20;
    // const lastPoint = initialPoints.isActive.value ? initialPoints.y.value - 20 : calcItemWidth / 2 - 20;
    return translation.y.value + interpolate(isScroll.value, [0, 1], [0, prevLP]);
  }, [translation, initialPoints, isScroll]);

  useEffect(() => {
    animation.value = withDelay(index * 124, withSpring(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, any>({
    onStart: (event) => {
      initialPoints.x.value = event.x;
      initialPoints.y.value = event.y;
      initialPoints.isActive.value = true;
    },
    onActive: (event, ctx) => {
      isScroll.value = withTiming(1);
      translation.x.value = event.translationX;
      translation.y.value = event.translationY;
      ctx.snapX = TX.value;
      ctx.snapY = TY.value;
    },
    onEnd: (_, ctx) => {
      isScroll.value = withTiming(0, {}, () => (initialPoints.isActive.value = false));
      translation.x.value = withSpring(0);
      translation.y.value = withSpring(0);
    },
  });

  const appearanceStyle = useAnimatedStyle(() => {
    const initValue = !(index % 2) ? -100 : 100;
    const translateX = interpolate(animation.value, [0, 1], [initValue, 0]);
    return {
      opacity: animation.value,
      transform: [{translateX}],
    };
  });

  const stylez = useAnimatedStyle(() => {
    const size = interpolate(isScroll.value, [0, 1], [calcItemWidth, 40]);
    const borderRadius = interpolate(isScroll.value, [0, 1], [12, 20]);
    return {
      transform: [{translateX: TX.value}, {translateY: TY.value}],
      width: size,
      borderRadius,
    };
  });

  const styl = useAnimatedStyle(() => ({zIndex: initialPoints.isActive.value ? 2 : 1}));

  return (
    <Animated.View style={styl}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {
              width: (width - 48) / 2,
              aspectRatio: 1,
              marginBottom: 16,
              borderRadius: 12,
            },
            appearanceStyle,
          ]}
          onLayout={(e) => console.log(e.nativeEvent.layout, 'LAYOUT')}
        >
          <Animated.View style={[{borderRadius: 12, aspectRatio: 1, overflow: 'hidden'}, stylez]}>
            <Image source={{uri: item.uri}} style={{flex: 1}} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default InitialItem;

type TProps = {
  item: TInitialItem;
  index: number;
  bottomY: number | null;
};
