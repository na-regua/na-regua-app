import {TColorsType} from '@/theme/colors';
import ArrowLeftIcon from './ArrowLeft/ArrowLeft';
import BellIcon from './BellIcon/BellIcon';
import CameraIcon from './CameraIcon/CameraIcon';
import DeleteIcon from './DeleteIcon/DeleteIcon';
import EditIcon from './EditIcon/EditIcon';
import EyeIcon from './EyeIcon/EyeIcon';
import MaquinaIcon from './MaquinaIcon/MaquinaIcon';
import MoneyIcon from './MoneyIcon/MoneyIcon';
import NavalhaIcon from './NavalhaIcon/NavalhaIcon';
import PenteIcon from './PenteIcon/PenteIcon';
import ScheduleIcon from './ScheduleIcon/ScheduleIcon';
import SettingsIcon from './SettingsIcon/SettingsIcon';
import UserIcon from './UserIcon/UserIcon';
import TimeIcon from './TimeIcon/TimeIcon';

export interface IIconProps {
  width?: number;
  height?: number;
  color?: TColorsType;
  customColor?: string;
  strokeWidth?: number;
}

export default {
  ArrowLeftIcon,
  BellIcon,
  CameraIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  MaquinaIcon,
  MoneyIcon,
  NavalhaIcon,
  PenteIcon,
  ScheduleIcon,
  SettingsIcon,
  TimeIcon,
  UserIcon,
};
