import React from 'react';
import {useState, useEffect, useCallback, useMemo, useTranslation} from '@hooks';
import {View, Text} from '@components';
import styles from './styles';
import {Pressable} from 'react-native';
import {MotiView} from '@motify/components';
import {Easing} from 'react-native-reanimated';
import {MotiTransitionProp} from '@motify/core';

const _colors = {
  active: '#000',
  inactive: '#fff',
};

const transition: MotiTransitionProp = {
  type: 'timing',
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

export const SwitchComponent: React.FC<TProps> = ({size, onPress, isActive}) => {
  // Switch screen data.
  const trackWidth = useMemo(() => {
    return size * 1.5;
  }, [size]);
  const trackHeight = useMemo(() => {
    return size * 0.4;
  }, [size]);
  const knobSize = useMemo(() => {
    return size * 0.6;
  }, [size]);

  return (
    <Pressable onPress={onPress}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <MotiView
          transition={transition}
          animate={{
            backgroundColor: isActive ? _colors.active : _colors.inactive,
          }}
          style={{
            position: 'absolute',
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: _colors.active,
          }}
        />
        <MotiView
          transition={transition}
          animate={{
            translateX: isActive ? trackWidth / 4 : -trackWidth / 4,
          }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MotiView
            transition={transition}
            animate={{
              width: isActive ? 0 : knobSize,
              borderColor: isActive ? _colors.active : _colors.inactive,
            }}
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: size * 0.1,
              borderColor: _colors.active,
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

type TProps = {
  size: number;
  onPress: () => void;
  isActive: boolean;
};
