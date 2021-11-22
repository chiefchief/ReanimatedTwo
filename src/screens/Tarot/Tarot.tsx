/**
 *
 * https://youtu.be/xPbRsca_l7c
 *
 */

import React from 'react';
import {View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {Card} from './Card';
import styles from './styles';

const cards = [
  {source: require('./assets/death.png')},
  {source: require('./assets/chariot.png')},
  {source: require('./assets/high-priestess.png')},
  {source: require('./assets/justice.png')},
  {source: require('./assets/lover.png')},
  {source: require('./assets/pendu.png')},
  {source: require('./assets/tower.png')},
  {source: require('./assets/strength.png')},
];

export const assets = cards.map((card) => card.source);

export const Tarot = () => {
  const shuffleBack = useSharedValue(false);
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card card={card} key={index} index={index} shuffleBack={shuffleBack} />
      ))}
    </View>
  );
};
