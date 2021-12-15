/**
 *
 * https://youtu.be/LwKUjau3Ifw
 *
 */

import React from 'react';
import {useState, useEffect, useCallback, useMemo, useTranslation} from '@hooks';
import {View, Text} from '@components';
import styles from './styles';
import {SwitchComponent} from './SwitchComponent';

const Switch: React.FC<TProps> = () => {
  // Switch screen data.
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <SwitchComponent size={60} onPress={() => setIsActive(!isActive)} isActive={isActive} />
    </View>
  );
};

export default Switch;

type TProps = {};
