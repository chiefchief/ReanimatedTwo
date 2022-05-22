import React, {useState} from 'react';
import {View, Text, Modal} from '@components';
import styles from './styles';
import {ListRenderItem, Pressable} from 'react-native';
import Animated, {asin, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import {YearItem} from './YearItem';
import {ITEM_SIZE, VISIBLE_ITEMS_COUNT} from './constants';

const today = new Date();
const yearsArray = new Array(today.getFullYear() - 1899).fill(0).map((_, i) => `${1900 + i}`);

const WheelPicker: React.FC<TProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const translateY = useSharedValue(0);

  const toggleIsVisible = () => setIsVisible(!isVisible);

  const onScroll = useAnimatedScrollHandler((e) => {
    translateY.value = e.contentOffset.y;
  });

  console.log(asin(1), 'ONE');

  const keyExtractor = (item: string) => item;
  const renderItem: ListRenderItem<string> = ({item, index}) => (
    <YearItem
      item={item}
      index={index}
      itemSize={ITEM_SIZE}
      translateY={translateY}
      visibleItemsCount={VISIBLE_ITEMS_COUNT}
    />
  );

  const contentHeight = ITEM_SIZE * 9;

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleIsVisible}>
        <Text>{'Open Wheel Picker'}</Text>
      </Pressable>
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
              decelerationRate={2}
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

export default WheelPicker;

type TProps = {};
