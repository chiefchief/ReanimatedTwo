import React from 'react';
import {ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from 'react-native';
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import {YearItem} from './YearItem';

export const WheelPicker: React.FC<WheelPickerProps> = ({itemHeight = 24, data, visibleItemsCount = 9}) => {
  const translateY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(e => {
    translateY.value = e.contentOffset.y;
  });

  const radius = ((visibleItemsCount + 1) * itemHeight) / Math.PI;
  const halfHeight = ((visibleItemsCount + 1) / 2) * itemHeight;
  const contentHeight = radius * 2 + itemHeight * 3;

  const keyExtractor = (item: string) => item;
  const renderItem: ListRenderItem<string> = ({item, index}) => (
    <YearItem
      item={item}
      index={index}
      itemSize={itemHeight}
      translateY={translateY}
      visibleItemsCount={visibleItemsCount}
      diff={halfHeight - radius}
    />
  );

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(e.nativeEvent.contentOffset.y / itemHeight);
  };

  return (
    <View>
      <Animated.FlatList
        decelerationRate={1}
        snapToInterval={itemHeight}
        scrollEventThrottle={16}
        onScroll={onScroll}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={{maxHeight: contentHeight}}
        contentContainerStyle={{paddingVertical: (contentHeight - itemHeight) / 2}}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={10}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <View style={[styles.line, {top: (contentHeight - itemHeight) / 2}]} />
      <View style={[styles.line, {bottom: (contentHeight - itemHeight) / 2}]} />
    </View>
  );
};

export type WheelPickerProps = {
  data: string[];
  /** @default 24 */
  itemHeight?: number;
  /** @default 9 */
  visibleItemsCount?: number;
};

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    width: 65,
    height: 1,
    backgroundColor: 'black',
  },
});
