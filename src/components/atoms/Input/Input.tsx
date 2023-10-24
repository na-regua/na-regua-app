import {Colors} from '@/theme';
import React, {ReactNode, useMemo, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {InputLabelStyle, InputStyle, InputWrapperStyle, styles} from './styles';

interface IInputProps extends TextInputProps {
  label: string;
  suffix?: ReactNode;
  wrapperStyle?: ViewStyle;
  inputRef?: React.RefObject<TextInput>;
}

const Input: React.FC<IInputProps> = ({
  label,
  style,
  placeholder,
  suffix,
  wrapperStyle,
  onBlur,
  onChangeText,
  value,
  inputRef,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suffixWidth, setSuffixWidth] = useState(0);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);

    onBlur?.(e);
  };

  const active: boolean = useMemo(
    () => isFocused || !!value,
    [isFocused, value],
  );

  const handleOnChangeText = (text: string) => {
    onChangeText?.(text);
  };

  return (
    <InputWrapperStyle style={wrapperStyle}>
      {active && <InputLabelStyle>{label}</InputLabelStyle>}

      <InputStyle
        style={[style, {paddingRight: suffixWidth + 16}]}
        active={active}
        autoCorrect={false}
        spellCheck={false}
        onFocus={handleFocus}
        placeholder={placeholder || (isFocused ? '' : label)}
        placeholderTextColor={isFocused ? Colors.main : Colors.placeholder}
        {...inputProps}
        value={value}
        onChangeText={handleOnChangeText}
        onBlur={e => handleBlur(e)}
        as={TextInput}
        ref={inputRef}
      />

      {suffix && (
        <View
          onLayout={({
            nativeEvent: {
              layout: {width},
            },
          }) => setSuffixWidth(Math.ceil(width))}
          style={styles.suffixWrapper}>
          {suffix}
        </View>
      )}
    </InputWrapperStyle>
  );
};

export default Input;
