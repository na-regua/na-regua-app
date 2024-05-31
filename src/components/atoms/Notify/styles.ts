import {TNotifyTypes} from '@/app/models';
import {Colors} from '@/theme';
import {TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import styled, {css} from 'styled-components/native';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const ErrorCss = css`
  background: ${Colors.danger};
`;

export const SuccessCss = css`
  background: ${Colors.success};
`;

export const NotifyContainer = styled(AnimatedTouchableOpacity)<{
  type: TNotifyTypes;
}>`
  align-items: center;
  justify-content: center;
  padding: 12px;
  flex-direction: row;
  border-radius: 8px;
  background: ${Colors.black2};
  flex: 1;
  gap: 8px;

  ${({type}) => type === 'error' && ErrorCss}
  ${({type}) => type === 'success' && SuccessCss}
`;
