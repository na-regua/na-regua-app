import React from 'react';
import Typography from '../Typography/Typography';
import {
  CheckboxContainerStyle,
  CheckboxDotStyle,
  CheckboxWrapperStyle,
} from './styles';

interface ICheckboxProps {
  onChange?: (value: boolean) => void;
  value?: boolean;
  label?: string;
}

const Checkbox: React.FC<ICheckboxProps> = ({value, label, onChange}) => {
  const handleOnChange = () => {
    if (onChange) {
      onChange(!value);
    }
  };

  return (
    <CheckboxWrapperStyle onPress={handleOnChange} activeOpacity={0.8}>
      <CheckboxContainerStyle>
        <CheckboxDotStyle active={value} />
      </CheckboxContainerStyle>
      {label && (
        <Typography variant="caption" color="black2">
          {label}
        </Typography>
      )}
    </CheckboxWrapperStyle>
  );
};

export default Checkbox;
