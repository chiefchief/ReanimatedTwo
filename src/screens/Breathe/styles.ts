import {width} from '@constants';
import {StyleSheet} from 'react-native';

export const SIZE = width / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerCircle: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    opacity: 0.5,
  },
});
