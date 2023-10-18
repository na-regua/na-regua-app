import {TColorsType} from '@/theme/colors';
import ArrowLeftIcon from './ArrowLeft/ArrowLeft';
import BellIcon from './BellIcon/BellIcon';
import CameraIcon from './CameraIcon/CameraIcon';
import EditIcon from './EditIcon/EditIcon';
import EyeIcon from './EyeIcon/EyeIcon';
import RemoveIcon from './RemoveIcon/RemoveIcon';
import UserIcon from './UserIcon/UserIcon';

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
  EditIcon,
  RemoveIcon,
};
