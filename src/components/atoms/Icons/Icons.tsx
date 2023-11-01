import {TColorsType} from '@/theme/colors';
import ArrowLeftIcon from './ArrowLeft/ArrowLeft';
import BellIcon from './BellIcon/BellIcon';
import CameraIcon from './CameraIcon/CameraIcon';
import DeleteIcon from './DeleteIcon/DeleteIcon';
import EditIcon from './EditIcon/EditIcon';
import EyeIcon from './EyeIcon/EyeIcon';
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
  style?: any;
}

export default {
  ArrowLeftIcon,
  BellIcon,
  CameraIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
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
};
