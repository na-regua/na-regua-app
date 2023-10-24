import React = require('react');
import {oneDigitMask} from '@/utils';
import {createRef, useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native';
import {CodeInputStyle, CodeWrapperStyle} from './styles';

interface ICodeInputProps {
  onCodeChange: (code: string) => void;
  digits: number;
  onDone?: () => void;
}

interface ICodeInputsArr {
  ref: React.RefObject<TextInput>;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
}

const CodeInput: React.FC<ICodeInputProps> = ({
  digits,
  onCodeChange,
  onDone,
}) => {
  const inputValuesArray: ICodeInputsArr[] = [];
  const {watch, register, control, setValue} = useForm();

  const formValue = watch();

  for (let i = 0; i < digits; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isFocused, setIsFocused] = useState(false);

    const ref = createRef<TextInput>();

    register(`code-${i}`, {required: true});

    inputValuesArray.push({
      isFocused,
      setIsFocused,
      ref,
    });
  }

  useEffect(() => {
    onCodeChange(Object.values(formValue).join(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const handleCodeOnChange = (
    text: string,
    index: number,
    cb: (...event: any) => void,
  ) => {
    // Check if the input is a number and if the value is higher than one digit
    // if so, set the value of the next input and focus the next from it

    const onlyDecimal = /\D/g.test(text);
    if (text.length > 1 && !onlyDecimal) {
      const nextIndex = index + 1;

      if (nextIndex < digits) {
        setValue(`code-${nextIndex}`, text[1]);

        if (inputValuesArray[nextIndex + 1]) {
          inputValuesArray[index + 2].ref.current?.focus();
        } else {
          inputValuesArray[index + 1].ref.current?.focus();
        }
      } else {
        text = text[1];
      }

      text = oneDigitMask(text);
    } else {
      text = oneDigitMask(text);

      if (text.length === 1) {
        if (index < digits - 1) {
          inputValuesArray[index + 1].ref.current?.focus();
        }
      } else if (text.length === 0) {
        const prevValue = watch(`code-${index - 1}`);

        if (index > 0 && !prevValue) {
          inputValuesArray[index - 1].ref.current?.focus();
        }
      }
    }
    cb(text);
  };

  return (
    <CodeWrapperStyle>
      {inputValuesArray.map(({isFocused, setIsFocused, ref}, index) => (
        <Controller
          key={index}
          name={`code-${index}`}
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <CodeInputStyle
              as={TextInput}
              ref={ref}
              value={value}
              onFocus={() => {
                setIsFocused(true);
              }}
              placeholder="0"
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onChangeText={text => {
                handleCodeOnChange(text, index, onChange);
              }}
              isFocused={isFocused}
              key={index}
              onKeyPress={e => {
                if (e.nativeEvent.key === 'Backspace') {
                  if (index > 0) {
                    inputValuesArray[index - 1].ref.current?.focus();
                  }
                }
              }}
              keyboardType="number-pad"
              returnKeyType="done"
              onSubmitEditing={() => onDone && onDone()}
            />
          )}
        />
      ))}
    </CodeWrapperStyle>
  );
};

export default CodeInput;
