import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {Colors, Fonts} from '@/theme';

interface IInputProps extends TextInputProps {
  label: string;
}

const Input: React.FC<IInputProps> = ({
  label,
  style,
  placeholder,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const textInputStyle = useMemo(() => {
    if (isFocused) {
      return [style, styles.input, styles.inputFocused];
    }

    return [style, styles.input];
  }, [isFocused, style]);

  return (
    <View style={styles.inputWrapper}>
      {isFocused && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={textInputStyle}
        autoCorrect={false}
        spellCheck={false}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder || (isFocused ? '' : label)}
        placeholderTextColor={isFocused ? Colors.main : Colors.placeholder}
        {...inputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    width: 'auto',
    height: 'auto',
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
    fontWeight: Fonts.weights.medium,
    fontFamily: Fonts.types.medium,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: Colors.black3,
  },
  inputFocused: {
    fontFamily: Fonts.types.semiBold,
    fontWeight: Fonts.weights.semiBold,
    borderColor: Colors.main,
  },
});

export default Input;
