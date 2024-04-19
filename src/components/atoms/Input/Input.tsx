import {Colors} from '@/theme';
import React, {ReactNode, useMemo, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {InputLabelStyle, InputStyle, InputWrapperStyle, styles} from './styles';
import {useTranslation} from 'react-i18next';

interface IInputProps extends TextInputProps {
  label: string;
  suffix?: ReactNode;
  textStyle?: TextStyle;
  wrapperStyle?: ViewStyle;
  inputRef?: React.RefObject<TextInput>;
}

const Input: React.FC<IInputProps> = ({
  label,
  textStyle,
  placeholder,
  suffix,
  wrapperStyle,
  onBlur,
  onChangeText,
  value,
  inputRef,
  ...inputProps
}) => {
  const {t} = useTranslation();
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
      {active && (
        <InputLabelStyle focused={isFocused}>
          {label && t(label)}
        </InputLabelStyle>
      )}

      <InputStyle
        style={[{paddingRight: suffixWidth + 16}]}
        active={active}
        borderColor={textStyle?.borderColor}
        autoCorrect={false}
        spellCheck={false}
        onFocus={handleFocus}
        placeholder={
          (placeholder && t(placeholder)) || (isFocused ? '' : t(label))
        }
        placeholderTextColor={isFocused ? Colors.main : Colors.placeholder}
        focused={isFocused}
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
