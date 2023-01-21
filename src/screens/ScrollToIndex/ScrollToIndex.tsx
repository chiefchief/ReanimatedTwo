/**
 *
 * https://youtu.be/pTtxhuThMew
 *
 */

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import faker from 'faker';
import * as React from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useRef, useState, useEffect} from '@hooks';
import {MotiView} from 'moti';

const {width} = Dimensions.get('screen');

faker.seed(10);

const data = [...Array(20).keys()].map(() => ({
  key: faker.datatype.uuid(),
  job: faker.animal.crocodilia(),
}));

const _colors = {
  active: `#FCD259ff`,
  inactive: `#FCD25900`,
};
const _spacing = 10;

export default function UberEats() {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [viewPosition, setViewPosition] = useState(0);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition, // item position on the screen (left | middle | right) percentage
      viewOffset: viewPosition < 1 ? _spacing : 0, // distance betwin screen side and element
    });
  }, [index, viewPosition]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        ref={ref}
        initialScrollIndex={index}
        style={{flexGrow: 0}}
        data={data}
        keyExtractor={item => item.key}
        contentContainerStyle={{paddingLeft: _spacing}}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index: fIndex}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIndex(fIndex);
              }}
            >
              <MotiView
                animate={{
                  backgroundColor: fIndex === index ? _colors.active : _colors.inactive,
                  opacity: fIndex === index ? 1 : 0.48,
                }}
                transition={{
                  type: 'timing',
                  duration: 480,
                }}
                style={{
                  marginRight: _spacing,
                  padding: _spacing,
                  borderWidth: 2,
                  borderColor: _colors.active,
                  borderRadius: 12,
                }}
              >
                <Text style={{color: '#36303F', fontWeight: '700'}}>{item.job}</Text>
              </MotiView>
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: _spacing * 10,
        }}
      >
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: '#36303F',
              fontWeight: '700',
              marginBottom: _spacing,
            }}
          >
            Scroll position
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width / 2,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setViewPosition(0);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                  marginRight: _spacing,
                }}
              >
                <Entypo name="align-left" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewPosition(0.5);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                  marginRight: _spacing,
                }}
              >
                <Entypo name="align-horizontal-middle" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewPosition(1);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                }}
              >
                <Entypo name="align-right" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#36303F', fontWeight: '700', marginBottom: 10}}>Navigation</Text>
          <View
            style={{
              flexDirection: 'row',
              width: width / 2,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (index === 0) {
                  return;
                }
                setIndex(index - 1);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                  marginRight: _spacing,
                }}
              >
                <Feather name="arrow-left" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (index === data.length - 1) {
                  return;
                }
                setIndex(index + 1);
              }}
            >
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                }}
              >
                <Feather name="arrow-right" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
