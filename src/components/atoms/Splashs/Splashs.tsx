import {SvgProps} from 'react-native-svg';
import {BarberCuttingSplash} from './BarberCuttingSplash/BarberCuttingSplash';
import {BarberSplash} from './BarberSplash/BarberSplash';
import {ClockSplash} from './ClockSplash/ClockSplash';
import {ScheduleSplash} from './ScheduleSplash/ScheduleSplash';

export interface ISplashProps {
  width?: number;
  height?: number;
  size?: number;
  color?: string;
  animatedProps?: any;
  style?: SvgProps['style'];
  grayscale?: boolean;
}

export default {
  BarberSplash,
  BarberCuttingSplash,
  ClockSplash,
  ScheduleSplash,
};
