import React from 'react';
import {View, Text} from '@components';
import {styles} from './styles';
import {StyleSheet} from 'react-native';
import {MotiView} from '@motify/components';
import {Easing} from 'react-native-reanimated';

const RingWaveIndicator: React.FC<TProps> = () => {
  // RingWaveIndicator screen data.

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((index) => {
          return (
            <MotiView
              from={{opacity: 0.5, scale: 1}}
              animate={{opacity: 0, scale: 4}}
              transition={{
                type: 'timing',
                duration: 2000,
                easing: Easing.out(Easing.ease),
                delay: index * 400,
                repeatReverse: false,
                loop: true,
              }}
              key={index}
              style={[StyleSheet.absoluteFillObject, styles.dot]}
            />
          );
        })}
        <Text>Ring Icon</Text>
      </View>
    </View>
  );
};

export default RingWaveIndicator;

type TProps = {};
