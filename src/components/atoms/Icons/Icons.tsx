import {TColorsType} from '@/theme/colors';
import BellIcon from './BellIcon/BellIcon';
import CameraIcon from './CameraIcon/CameraIcon';
import EyeIcon from './EyeIcon/EyeIcon';
import UserIcon from './UserIcon/UserIcon';
import ArrowLeftIcon from './ArrowLeft/ArrowLeft';

export interface IIconProps {
  width?: number;
  height?: number;
  color?: TColorsType;
  customColor?: string;
  strokeWidth?: number;
}

export default {
  BellIcon,
  CameraIcon,
  EyeIcon,
  UserIcon,
  ArrowLeftIcon,
};
