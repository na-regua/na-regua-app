import {Colors, Fonts} from '@/theme';
import React, {ReactNode, useMemo, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface IInputProps extends TextInputProps {
  label: string;
  suffix?: ReactNode;
  wrapperStyle?: ViewStyle;
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
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);

    onBlur?.(e);
  };

  const textInputStyle = useMemo(() => {
    if (isFocused || value) {
      return [style, styles.input, styles.inputFocused];
    }

    return [style, styles.input];
  }, [isFocused, style, value]);

  const handleOnChangeText = (text: string) => {
    onChangeText?.(text);
  };

  return (
    <View style={[styles.inputWrapper, wrapperStyle]}>
      {(isFocused || value) && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={textInputStyle}
        autoCorrect={false}
        spellCheck={false}
        onFocus={handleFocus}
        placeholder={placeholder || (isFocused ? '' : label)}
        placeholderTextColor={isFocused ? Colors.main : Colors.placeholder}
        {...inputProps}
        value={value}
        onChangeText={handleOnChangeText}
        onBlur={e => handleBlur(e)}
      />
      {suffix && <View style={styles.suffixWrapper}>{suffix}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  inputLabel: {
    position: 'absolute',
    backgroundColor: Colors.bgLight,
    zIndex: 2,
    top: -8,
    left: 12,
    paddingHorizontal: 2,
    color: Colors.main,
    fontSize: 12,
    fontFamily: Fonts.types.medium,
    fontWeight: Fonts.weights.medium,
  },
  input: {
    height: 40,
    fontWeight: Fonts.weights.semiBold,
    fontFamily: Fonts.types.semiBold,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: Colors.black3,
    fontSize: 14,
  },
  inputFocused: {
    fontFamily: Fonts.types.semiBold,
    fontWeight: Fonts.weights.semiBold,
    borderColor: Colors.main,
  },
  suffixWrapper: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    marginVertical: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Input;
