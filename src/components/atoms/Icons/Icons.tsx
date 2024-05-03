import {TColorsType} from '@/theme/colors';
import {ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {Path} from 'react-native-svg';
import ArrowLeftIcon from './ArrowLeftIcon/ArrowLeftIcon';
import ArrowRightIcon from './ArrowRightIcon/ArrowRightIcon';
import BellIcon from './BellIcon/BellIcon';
import CameraIcon from './CameraIcon/CameraIcon';
import ChevronDoubleLeftIcon from './ChevronDoubleLeftIcon/ChevronDoubleLeftIcon';
import {ChevronDownIcon} from './ChevronDownIcon/ChevronDownIcon';
import ChevronLeftIcon from './ChevronLeftIcon/ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon/ChevronRightIcon';
import ChevronUpIcon from './ChevronUpIcon/ChevronUpIcon';
import DeleteIcon from './DeleteIcon/DeleteIcon';
import EditIcon from './EditIcon/EditIcon';
import EyeIcon from './EyeIcon/EyeIcon';
import GaleryIcon from './GaleryIcon/GaleryIcon';
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
import QRSquadIcon from './QRSquadIcon/QRSquadIcon';
import ReceiptIcon from './ReceiptIcon/ReceiptIcon';
import ScheduleIcon from './ScheduleIcon/ScheduleIcon';
import ScheduleTwotoneIcon from './ScheduleTwotoneIcon/ScheduleTwotoneIcon';
import SettingsIcon from './SettingsIcon/SettingsIcon';
import SettingsTwotoneIcon from './SettingsTwotoneIcon/SettingsTwotoneIcon';
import SunIcon from './SunIcon/SunIcon';
import TimeIcon from './TimeIcon/TimeIcon';
import TimeTwotoneIcon from './TimeTwotoneIcon/TimeTwotoneIcon';
import UserCheckIcon from './UserCheckIcon/UserCheckIcon';
import UserIcon from './UserIcon/UserIcon';
import UsersIcon from './UsersIcon/UsersIcon';
import ChevronDoubleRightIcon from './ChevronDoubleRightIcon/ChevronDoubleRightIcon';

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

export const AnimatedPath = Animated.createAnimatedComponent(Path);

export default {
  ChevronDownIcon,
  ArrowLeftIcon,
  ChevronUpIcon,
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
  TimeTwotoneIcon,
  ScheduleTwotoneIcon,
  ReceiptIcon,
  SettingsTwotoneIcon,
  GaleryIcon,
  QRSquadIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
};
