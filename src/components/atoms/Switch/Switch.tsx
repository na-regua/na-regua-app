import React, {useEffect, useState} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SwitchDot, SwitchWrapperStyled} from './styles';

interface ISwitchProps {
  width?: number;
  dotWidth?: number;
  paddingLR?: number;
  active?: boolean;
  disabled?: boolean;
  waitForvalue?: boolean;
  onChange?: (value: boolean) => void;
  onPress?: () => void;
}

const CoreSwitch: React.FC<ISwitchProps> = ({
  width = 40,
  dotWidth = 15,
  paddingLR = 4,
  active = false,
  waitForvalue,
  onPress,
  onChange,
  disabled,
}) => {
  const [value, setValue] = useState(active);
  const LEFT_VALUE = paddingLR;
  const RIGHT_VALUE = width - paddingLR - dotWidth;

  const positionValue = useSharedValue(value ? RIGHT_VALUE : LEFT_VALUE);

  const animatedDotStyle = useAnimatedStyle(() => {
    return {
      left: positionValue.value,
    };
  }, [value]);

  const handleSwitchAction = () => {
    if (!waitForvalue) {
      const newValue = !value;
      const moveTo = newValue === true ? RIGHT_VALUE : LEFT_VALUE;
      positionValue.value = withSpring(moveTo);

      setValue(newValue);

      if (onChange) {
        onChange(newValue);
      }
    }

    if (waitForvalue && onPress) {
      onPress();
    }
  };

  useEffect(() => {
    if (waitForvalue) {
      setValue(active);
      const moveTo = active === true ? RIGHT_VALUE : LEFT_VALUE;
      positionValue.value = withSpring(moveTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, waitForvalue]);

  return (
    <SwitchWrapperStyled
      onPress={() => handleSwitchAction()}
      disabled={disabled}
      width={width}
      height={dotWidth + 2 * paddingLR}
      active={value}
      activeOpacity={0.6}>
      <SwitchDot width={dotWidth} style={animatedDotStyle} active={value} />
    </SwitchWrapperStyled>
  );
};

export {CoreSwitch};
