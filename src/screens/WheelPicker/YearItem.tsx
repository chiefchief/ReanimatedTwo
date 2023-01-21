import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

export const YearItem: React.FC<YearItemProps> = React.memo(
  ({item, index, itemSize, translateY, visibleItemsCount, diff}) => {
    const actualFontSize = Math.round(itemSize * (30 / 36));

    const y = useDerivedValue(() =>
      interpolate(
        translateY.value,
        [(index - visibleItemsCount / 2) * itemSize, (index + visibleItemsCount / 2) * itemSize],
        [-1, 1],
        Extrapolate.CLAMP,
      ),
    );

    const textStytle = useAnimatedStyle(() => ({
      transform: [{perspective: 80}, {rotateX: `${90 * y.value}deg`}, {scale: Math.cos(Math.abs(y.value))}],
    }));

    const blockStyle = useAnimatedStyle(() => ({
      transform: [{translateY: diff * Math.pow(y.value, 3)}],
    }));

    return (
      <Animated.View style={[{height: itemSize}, blockStyle]}>
        <Animated.Text style={[{lineHeight: itemSize, fontSize: actualFontSize, textAlign: 'center'}, textStytle]}>
          {item}
        </Animated.Text>
      </Animated.View>
    );
  },
);

// Check for performance - https://github.com/software-mansion/react-native-reanimated/issues/1516

type YearItemProps = {
  item: string;
  index: number;
  itemSize: number;
  translateY: SharedValue<number>;
  visibleItemsCount: number;
  diff: number;
};
