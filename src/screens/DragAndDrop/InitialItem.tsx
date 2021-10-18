import React, {useEffect} from 'react';
import Animated, {
  Extrapolate,
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
import {useHeaderHeight} from '@hooks';
import {calcWidth} from './DragAndDrop';

const calcItemWidth = (width - 48) / 2;

const InitialItem: React.FC<TProps> = ({item, index, bottomY}) => {
  const hh = useHeaderHeight();
  const translation = {x: useSharedValue(0), y: useSharedValue(0)};
  const initialPoints = {x: useSharedValue(0), y: useSharedValue(0), isActive: useSharedValue(false)};
  const isScroll = useSharedValue(0);
  const animation = useSharedValue(0);

  const TX = useDerivedValue(() => {
    const prevLP = initialPoints.x.value - 20;
    // const lastPoint = initialPoints.isActive.value ? initialPoints.x.value - 20 : calcItemWidth / 2 - 20;
    return translation.x.value + interpolate(isScroll.value, [0, 1, 2], [0, prevLP, 0]);
  }, [translation, initialPoints, isScroll]);
  const TY = useDerivedValue(() => {
    const prevLP = initialPoints.y.value - 20;
    // const lastPoint = initialPoints.isActive.value ? initialPoints.y.value - 20 : calcItemWidth / 2 - 20;
    return translation.y.value + interpolate(isScroll.value, [0, 1, 2], [0, prevLP, 0]);
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
    onEnd: (event, ctx) => {
      // console.log(bottomY, 'BOTT Y');
      if (Number.isInteger(bottomY) && event.absoluteY - hh - bottomY + 20 > 0) {
        isScroll.value = withTiming(2);
        translation.y.value = withSpring(bottomY - calcItemWidth);
        translation.x.value = withSpring(0);
      } else {
        isScroll.value = withTiming(0, {}, () => (initialPoints.isActive.value = false));
        translation.x.value = withSpring(0, {velocity: event.velocityX});
        translation.y.value = withSpring(0, {velocity: event.velocityY});
      }
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
    const size = interpolate(isScroll.value, [0, 1, 2], [calcItemWidth, 40, calcWidth]);
    const borderRadius = interpolate(isScroll.value, [0, 1, 2], [12, 20, 8]);
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

/**
 *
 * WORKS
 *
 */

// const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
//   onStart: (event, ctx) => {
//     ctx.initialX = transX.value;
//     ctx.initialY = transY.value;
//     initX.value = event.x - 20;
//     initY.value = event.y - 20;
//   },
//   onActive: (event, ctx) => {
//     transX.value = ctx.initialX + event.translationX + initX.value;
//     transY.value = ctx.initialY + event.translationY + initY.value;
//     isDraging.value = withTiming(1);
//   },
//   onEnd: (event) => {
//     const width = windowWidth - itemSize; // minus margins & width
//     const height = windowHeight - GTop - GBottom - itemSize; // minus margins & height
//     const toss = 0.2;
//     function clamp(value: number, min: number, max: number) {
//       return Math.min(Math.max(value, min), max);
//     }
//     const targetX = clamp(transX.value + toss * event.velocityX, 0, width);
//     const targetY = clamp(transY.value + toss * event.velocityY, 0, height);

//     const top = targetY;
//     const bottom = height - targetY;
//     const left = targetX;
//     const right = width - targetX;
//     const minDistance = Math.min(top, bottom, left, right);
//     let snapX = targetX;
//     let snapY = targetY;
//     switch (minDistance) {
//       case top:
//         snapY = 0;
//         break;
//       case bottom:
//         snapY = height;
//         break;
//       case left:
//         snapX = 0;
//         break;
//       case right:
//         snapX = width;
//         break;
//     }
//     if (snapY === height) {
//       isDraging.value = withTiming(2);
//       transX.value = withSpring(snapX, {velocity: event.velocityX});
//       transY.value = withSpring(snapY, {velocity: event.velocityY});
//     } else {
//       isDraging.value = withTiming(0);
//       transX.value = withSpring(0, {velocity: event.velocityX});
//       transY.value = withSpring(0, {velocity: event.velocityY});
//     }
//   },
// });

// const stylez = useAnimatedStyle(() => {
//   return {
//     width: interpolate(isDraging.value, [0, 1, 2], [itemSize, 40, 80]),
//     borderRadius: interpolate(isDraging.value, [0, 1, 2], [0, 20, 12]),
//     transform: [{translateX: transX.value}, {translateY: transY.value}],
//   };
// });
