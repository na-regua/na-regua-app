import {SvgProps} from 'react-native-svg';
import {BarberCuttingSplash} from './BarberCuttingSplash/BarberCuttingSplash';
import {BarberSplash} from './BarberSplash/BarberSplash';

export interface ISplashProps {
  width?: number;
  height?: number;
  size?: number;
  color?: string;
  animatedProps?: any;
  style?: SvgProps['style'];
}

export default {BarberSplash, BarberCuttingSplash};
