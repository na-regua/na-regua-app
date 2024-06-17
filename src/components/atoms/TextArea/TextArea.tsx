import {Colors} from '@/theme';
import React, {useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput, ViewStyle} from 'react-native';
import {TextAreaStyled} from './styles';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  height = 82,
  width = '100%',
  maxLength,
}) => {
  const {t} = useTranslation();

  const TextAreaStyle: ViewStyle = useMemo(
    () => ({height, width}),
    [height, width],
  );

  const [isFocused, setIsFocused] = useState(false);

  const ref = useRef<TextInput>(null);

  const isActive: boolean = useMemo(
    () => isFocused || !!value,
    [isFocused, value],
  );

  return (
    <TextAreaStyled
      as={TextInput}
      ref={ref}
      maxLength={maxLength}
      placeholder={placeholder ? t(placeholder) : ''}
      placeholderTextColor={Colors.placeholder}
      onChangeText={text => onChange(text)}
      style={TextAreaStyle}
      multiline
      value={value}
      numberOfLines={4}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      isFocused={isFocused}
      isActive={isActive}
    />
  );
};

export {TextArea};
