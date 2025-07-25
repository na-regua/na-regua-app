import {Colors} from '@/theme';
import {ViewStyle} from 'react-native';

export const strongShadowStyle: ViewStyle = {
  // IOS
  shadowColor: Colors.black1,
  shadowOffset: {
    height: 12,
    width: 0,
  },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  // Android
  elevation: 9,
};

export const normalShadowStyle: ViewStyle = {
  // IOS
  shadowColor: Colors.black1,
  shadowOffset: {
    height: 12,
    width: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 15,
  // Android
  elevation: 6,
};

export const softShadowStyle: ViewStyle = {
  // IOS
  shadowColor: Colors.black3,
  shadowOffset: {
    height: 12,
    width: 0,
  },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  // Android
  elevation: 3,
};
