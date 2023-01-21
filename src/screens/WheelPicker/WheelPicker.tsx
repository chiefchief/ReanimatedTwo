import React, {useState} from 'react';
import {View, Text, Modal} from '@components';
import styles from './styles';
import {ListRenderItem, Pressable} from 'react-native';
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import {YearItem} from './YearItem';
import {ITEM_SIZE, VISIBLE_ITEMS_COUNT} from './constants';
import {WheelPicker as WPC} from './WheelPickerComponent';

const today = new Date();
const yearsArray = new Array(today.getFullYear() - 1899).fill(0).map((_, i) => `${1900 + i}`);

export const WheelPicker: React.FC<TProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const translateY = useSharedValue(0);

  const toggleIsVisible = () => {
    translateY.value = 0;
    setIsVisible(!isVisible);
  };

  const onScroll = useAnimatedScrollHandler(e => {
    translateY.value = e.contentOffset.y;
  });

  const radius = ((VISIBLE_ITEMS_COUNT + 1) * ITEM_SIZE) / Math.PI;
  const halfHeight = ((VISIBLE_ITEMS_COUNT + 1) / 2) * ITEM_SIZE;

  const keyExtractor = (item: string) => item;
  const renderItem: ListRenderItem<string> = ({item, index}) => (
    <YearItem
      item={item}
      index={index}
      itemSize={ITEM_SIZE}
      translateY={translateY}
      visibleItemsCount={VISIBLE_ITEMS_COUNT}
      diff={halfHeight - radius}
    />
  );

  const contentHeight = ITEM_SIZE * 9;

  // 160 -> radius
  // 96 -> 88.21262326748673
  // const radius = ((VISIBLE_ITEMS_COUNT + 1) * 2 * ITEM_SIZE) / Math.PI; // 101.85916357881302
  // length equal 2*Pi*R
  // 18*32 = 2* Math.PI*r

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleIsVisible}>
        <Text>{'Open Wheel Picker'}</Text>
      </Pressable>
      <WPC data={yearsArray} itemHeight={32} />
      <Modal style={{margin: 0, justifyContent: 'flex-end'}} isVisible={isVisible} onBackdropPress={toggleIsVisible}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 24,
            marginHorizontal: 16,
            marginVertical: 24,
            paddingVertical: 16,
          }}
        >
          <View style={{alignItems: 'center'}}>
            <Animated.FlatList
              decelerationRate={0.64}
              snapToInterval={ITEM_SIZE} // item height if vertical, item with when horizontal
              // pagingEnabled={true} // OR PREVIOUS TWO
              //
              // keyboardShouldPersistTaps // SHOULD REMOVE FOCUS
              scrollEventThrottle={16}
              onScroll={onScroll}
              data={yearsArray}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={{maxHeight: contentHeight}}
              contentContainerStyle={{paddingVertical: (contentHeight - ITEM_SIZE) / 2}}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              initialNumToRender={10}
              onMomentumScrollEnd={e => console.log(e, 'onMomentumScrollEnd')}
              onScrollAnimationEnd={() => console.log('onScrollAnimationEnd')}
              onScrollEndDrag={e => console.log(e, 'onScrollEndDrag')}
            />
            <View
              style={{
                width: 200,
                position: 'absolute',
                height: 1,
                backgroundColor: 'black',
                top: (contentHeight - ITEM_SIZE) / 2,
              }}
            />
            <View
              style={{
                width: 200,
                position: 'absolute',
                height: 1,
                backgroundColor: 'black',
                bottom: (contentHeight - ITEM_SIZE) / 2,
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

type TProps = {};
