import React from 'react';
import Animated, {Extrapolate, interpolate, SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {MatrixTransform} from 'react-native';

export const YearItem: React.FC<YearItemProps> = ({item, index, itemSize = 24, translateY, visibleItemsCount = 4}) => {
  const actualFontSize = Math.round(itemSize * (30 / 36));

  const textStytle = useAnimatedStyle(() => {
    const degree = interpolate(
      translateY.value,
      [(index - (visibleItemsCount + 0.5)) * itemSize, (index + (visibleItemsCount + 0.5)) * itemSize],
      [-90, 90],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{perspective: 80}, {rotateX: `${degree}deg`}],
    };
  });

  const blockStyle = useAnimatedStyle(() => {
    const tY = interpolate(
      translateY.value,
      [
        (index - 5) * itemSize,
        (index - 4) * itemSize,
        (index - 3) * itemSize,
        (index - 2) * itemSize,
        (index - 1) * itemSize,
        index * itemSize,
        (index + 1) * itemSize,
        (index + 2) * itemSize,
        (index + 3) * itemSize,
        (index + 4) * itemSize,
        (index + 5) * itemSize,
      ],
      [0, -32, -16, -8, -2, 0, 2, 8, 16, 32, 0],
    );
    return {
      transform: [{translateY: tY}],
    };
  });

  return (
    <Animated.View style={[{height: itemSize}, blockStyle]}>
      <Animated.Text style={[{lineHeight: itemSize, fontSize: actualFontSize}, textStytle]}>{item}</Animated.Text>
    </Animated.View>
  );
};

type YearItemProps = {
  item: string;
  index: number;
  /** @default 24 */
  itemSize?: number;
  translateY: SharedValue<number>;
  /** @default 4 */
  visibleItemsCount?: number;
};

// const matrixPerspective = interpolate(
//   translateY.value,
//   [(index - 4) * itemSize, (index - 1) * itemSize, (index + 1) * itemSize, (index + 4) * itemSize],
//   [0.05, 0.01, -0.01, -0.04],
//   Extrapolate.CLAMP,
// );
// const size = interpolate(
//   translateY.value,
//   [(index - 4) * itemSize, (index - 1) * itemSize, (index + 1) * itemSize, (index + 4) * itemSize],
//   [2, 1.1, 1, 1.1, 2],
//   Extrapolate.CLAMP,
// );
//   transform: [{matrix: [1, 0, 0, 0, 0, 1, 0, matrixPerspective, 0, 0, 1, 0, 0, 0, 0, size]}],
