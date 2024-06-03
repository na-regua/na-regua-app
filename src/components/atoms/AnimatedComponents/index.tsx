import {ScrollView, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedView = Animated.createAnimatedComponent(View);
export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
