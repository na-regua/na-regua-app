import {SvgProps} from 'react-native-svg';
import {BarberSplash} from './Barber/Barber';
import {BarberCutting} from './BarberCutting/BarberCutting';

export interface ISplashProps {
  width?: number;
  height?: number;
  color?: string;
  animatedProps?: any;
  style?: SvgProps['style'];
}

export default {BarberSplash, BarberCutting};
