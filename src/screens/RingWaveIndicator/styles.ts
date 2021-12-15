import {ColorValue, StyleSheet} from 'react-native';

export const _size: number = 100;
export const _color: ColorValue = '#6E01EF';

export const styles = StyleSheet.create({
  dot: {
    width: _size,
    borderRadius: _size / 2,
    backgroundColor: _color,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
