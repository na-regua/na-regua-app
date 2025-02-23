import {Colors} from '@/theme';
import React, {ReactNode, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Box} from '../Box/Box';
import {InputLabelStyle, InputStyle, InputWrapperStyle, styles} from './styles';

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
  editable = true,
  ...inputProps
}) => {
  const {t} = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [suffixWidth, setSuffixWidth] = useState(0);
  const [fieldValue, setFieldValue] = useState(value);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  const active: boolean = useMemo(
    () => isFocused || !!value || !!fieldValue,
    [isFocused, value, fieldValue],
  );

  const handleOnChangeText = (text: string) => {
    setFieldValue(text);
    onChangeText?.(text);
  };

  return (
    <InputWrapperStyle style={wrapperStyle}>
      {active && (
        <InputLabelStyle editable={editable} focused={isFocused}>
          {label && t(label)}
        </InputLabelStyle>
      )}

      <InputStyle
        style={[{paddingRight: suffixWidth + 16}, inputProps.style]}
        active={active}
        borderColor={textStyle?.borderColor}
        autoCorrect={false}
        spellCheck={false}
        editable={editable}
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
        <Box
          zIndex={2}
          onLayout={({
            nativeEvent: {
              layout: {width},
            },
          }) => setSuffixWidth(Math.ceil(width))}
          style={styles.suffixWrapper}>
          {suffix}
        </Box>
      )}
    </InputWrapperStyle>
  );
};

export default Input;
