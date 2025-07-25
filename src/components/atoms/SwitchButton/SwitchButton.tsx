import React from 'react';
import {useTranslation} from 'react-i18next';
import Typography from '../Typography/Typography';
import {
  SwitchButtonContainerStyled,
  SwitchButtonStyled,
  SwitchButtonWrapperStyled,
} from './styles';

interface SwitchButtonProps<T = any> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  buttons?: {
    label: string;
    value: T;
  }[];
}

const SwitchButton = <T extends any>({
  label,
  buttons,
  onChange,
  value,
}: SwitchButtonProps<T>) => {
  const {t} = useTranslation();

  return (
    <SwitchButtonContainerStyled>
      {label && (
        <Typography variant="caption" color="placeholder">
          {t(label)}
        </Typography>
      )}
      <SwitchButtonWrapperStyled>
        {buttons &&
          buttons.map((button, index) => (
            <SwitchButtonStyled
              key={index}
              left={index === 0}
              onPress={() => onChange(button.value)}
              active={value === button.value}>
              <Typography
                variant="button"
                color={value === button.value ? 'white3' : 'primary'}>
                {t(button.label)}
              </Typography>
            </SwitchButtonStyled>
          ))}
      </SwitchButtonWrapperStyled>
    </SwitchButtonContainerStyled>
  );
};

export {SwitchButton};
