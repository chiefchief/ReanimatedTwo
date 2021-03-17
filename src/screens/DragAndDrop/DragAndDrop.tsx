import {Text, View} from '@components';
import {bottom, width} from '@constants';
import React, {useState} from 'react';
import {measure} from 'react-native-reanimated';
import InitialItem from './InitialItem';
import InitialItemCopy from './InitialItemCopy';
import {itemsData, TInitialItem} from './itemsData';

const data = ['1', '2', '3', '4'];

export const calcWidth = (width - 80) / 4;

const DragAndDrop: React.FC<TProps> = () => {
  const [bottomY, setBottomY] = useState<any>(null);
  const renderItem = (item: TInitialItem, index: number) => (
    <InitialItem key={`item-${item.id}`} item={item} index={index} bottomY={bottomY} />
  );

  const renderData = (item: string) => (
    <View
      key={`bottom-${item}`}
      style={{
        width: calcWidth,
        aspectRatio: 1,
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 50,
          backgroundColor: 'lightgray',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{fontWeight: 'bold', fontSize: 52, color: 'white'}}>{item}</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, paddingBottom: bottom}}>
      <View
        style={[
          {flex: 1, padding: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', zIndex: 2},
        ]}
      >
        {itemsData.map(renderItem)}
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          justifyContent: 'space-between',
        }}
        onLayout={(e) => setBottomY(e.nativeEvent.layout.y)}
      >
        {data.map(renderData)}
      </View>
    </View>
  );
};

export default DragAndDrop;

type TProps = {};
