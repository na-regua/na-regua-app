import {useKeyboardVisible} from '@/hooks';
import {TColorsType} from '@/theme/colors';
import React, {PropsWithChildren} from 'react';
import {AvoidKeyboardStyle} from './styles';

interface IAvoidKeyboardProps {
  keyboardBackgroundColor?: TColorsType;
}

const AvoidKeyboard: React.FC<PropsWithChildren<IAvoidKeyboardProps>> = ({
  keyboardBackgroundColor,
  children,
}) => {
  const {keyboardHeight} = useKeyboardVisible();
  return (
    <AvoidKeyboardStyle
      paddingBottom={keyboardHeight}
      backgroundColor={keyboardBackgroundColor}>
      {children}
    </AvoidKeyboardStyle>
  );
};

export default AvoidKeyboard;
