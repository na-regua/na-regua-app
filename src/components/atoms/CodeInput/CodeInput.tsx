import React = require('react');
import {Colors} from '@/theme';
import {numberMask, oneDigitMask} from '@/utils';
import {createRef, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native';
import {CodeInputStyle, CodeWrapperStyle} from './styles';

interface ICodeInputProps {
  onCodeChange: (code: string) => void;
  digits: number;
  onDone?: () => void;
  disabled?: boolean;
  showDoneButton?: boolean;
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
  disabled,
  showDoneButton = false,
}) => {
  const inputValuesArray: ICodeInputsArr[] = [];
  const {watch, register, control, setValue, getValues} = useForm();

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

  const findNextRef = (from: number): number => {
    const mappedNoValues = Object.keys(getValues()).filter((key, index) => {
      if (index <= from) {
        return false;
      }

      const value = watch(key);

      if (value === undefined || value === '') {
        return index;
      }
    });

    if (mappedNoValues.length === 0) {
      return digits - 1;
    }

    const nextIndex = +mappedNoValues[0].split('-')[1];

    return nextIndex;
  };

  const handleCodeOnChange = (
    text: string,
    index: number,
    cb: (...event: any) => void,
  ) => {
    if (text.length > 1) {
      const restantDigits = digits - (index + 1);

      const arrText = text.slice(1, restantDigits + 1).split('');

      arrText.forEach((value, i) => {
        const nextIndex = index + i + 1;

        if (nextIndex < digits) {
          setValue(`code-${nextIndex}`, value);
        }
      });
    }

    text = oneDigitMask(text);
    const isTyping = text.length !== 0;

    if (isTyping) {
      const hasNext = index + 1 < digits;

      // moving focus to next available input
      if (hasNext) {
        const nextIndex = findNextRef(index);

        if (nextIndex > 0) {
          inputValuesArray[nextIndex].ref.current?.focus();
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
          render={({field: {onChange, value}}) => (
            <CodeInputStyle
              as={TextInput}
              ref={ref}
              value={value}
              onFocus={() => {
                setIsFocused(true);
              }}
              placeholder="0"
              placeholderTextColor={Colors.placeholder}
              onBlur={() => {
                setIsFocused(false);
              }}
              editable={!disabled}
              onChange={({nativeEvent: {text}}) => {
                text = numberMask(text);
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
              textContentType="oneTimeCode"
              keyboardType="number-pad"
              returnKeyType={showDoneButton ? 'done' : 'default'}
              onSubmitEditing={() => {
                if (onDone) {
                  onDone();
                }
              }}
            />
          )}
        />
      ))}
    </CodeWrapperStyle>
  );
};

export default CodeInput;
