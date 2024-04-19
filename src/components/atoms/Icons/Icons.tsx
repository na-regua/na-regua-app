import {TColorsType} from '@/theme/colors';
import {ViewStyle} from 'react-native';
import ArrowLeftIcon from './ArrowLeft/ArrowLeft';
import BellIcon from './BellIcon/BellIcon';
import CameraIcon from './CameraIcon/CameraIcon';
import DeleteIcon from './DeleteIcon/DeleteIcon';
import {DownIcon} from './Down/Down';
import EditIcon from './EditIcon/EditIcon';
import EyeIcon from './EyeIcon/EyeIcon';
import {LeftIcon} from './Left/Left';
import {LinesIcon} from './Lines/Lines';
import LogoMiniIcon from './LogoMini/LogoMini';
import LogoWritingIcon from './LogoWriting/LogoWriting';
import MaquinaIcon from './MaquinaIcon/MaquinaIcon';
import MarketIcon from './MarketIcon/MarketIcon';
import MinusIcon from './MinusIcon/MinusIcon';
import MoneyIcon from './MoneyIcon/MoneyIcon';
import MoonIcon from './MoonIcon/MoonIcon';
import NavalhaIcon from './NavalhaIcon/NavalhaIcon';
import PenteIcon from './PenteIcon/PenteIcon';
import PlusIcon from './PlusIcon/PlusIcon';
import QRIcon from './QRIcon/QRIcon';
import ScheduleIcon from './ScheduleIcon/ScheduleIcon';
import SettingsIcon from './SettingsIcon/SettingsIcon';
import SunIcon from './SunIcon/SunIcon';
import TimeIcon from './TimeIcon/TimeIcon';
import UpIcon from './Up/Up';
import UserCheckIcon from './UserCheckIcon/UserCheckIcon';
import UserIcon from './UserIcon/UserIcon';
import UsersIcon from './UsersIcon/UsersIcon';

export interface IIconProps {
  width?: number;
  height?: number;
  color?: TColorsType;
  customColor?: string;
  strokeWidth?: number;
  clickable?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  wrapperStyle?: ViewStyle;
  svgStyle?: ViewStyle;
}

export default {
  DownIcon,
  ArrowLeftIcon,
  UpIcon,
  BellIcon,
  CameraIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  LeftIcon,
  MarketIcon,
  MaquinaIcon,
  MinusIcon,
  MoneyIcon,
  MoonIcon,
  NavalhaIcon,
  PenteIcon,
  PlusIcon,
  QRIcon,
  ScheduleIcon,
  SettingsIcon,
  SunIcon,
  TimeIcon,
  UserCheckIcon,
  UserIcon,
  UsersIcon,
  LogoWritingIcon,
  LinesIcon,
  LogoMiniIcon,
};
