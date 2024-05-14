import {useKeyboardVisible} from '@/hooks';
import {TColorsType} from '@/theme/colors';
import React from 'react';
import {TouchableWithoutFeedbackProps, ViewProps} from 'react-native';
import {AvoidKeyboardStyle} from './styles';

interface IAvoidKeyboardProps extends ViewProps {
  keyboardBackgroundColor?: TColorsType;
  touchableProps?: TouchableWithoutFeedbackProps;
}

const AvoidKeyboard: React.FC<IAvoidKeyboardProps> = ({
  keyboardBackgroundColor,
  children,
  ...props
}) => {
  const {keyboardHeight} = useKeyboardVisible();
  return (
    <AvoidKeyboardStyle
      paddingBottom={keyboardHeight}
      backgroundColor={keyboardBackgroundColor}
      {...props}>
      {children}
    </AvoidKeyboardStyle>
  );
};

export default AvoidKeyboard;
