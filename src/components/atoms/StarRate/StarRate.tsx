import {TColorsType} from '@/theme';
import React, {useEffect, useState} from 'react';
import {Box} from '../Box/Box';
import StarIcon from '../Icons/StarIcon/StarIcon';
import Typography from '../Typography/Typography';

interface StarRateProps {
  initialRate?: number;
  onPress?: (rate: number) => void;
  disabled?: boolean;
  length?: number;
  showTip?: boolean;
  gap?: number;
  starSize?: number;
  fillColor?: TColorsType;
  emptyColor?: TColorsType;
}

const StarRate: React.FC<StarRateProps> = ({
  initialRate,
  onPress,
  disabled = false,
  length = 5,
  gap = 18,
  starSize = 24,
  fillColor = 'warning',
  emptyColor = 'border',
}) => {
  const [rate, setRate] = useState(initialRate || 0);

  const shouldFillN = (n: number) => {
    return rate >= n;
  };

  const setRateN = (n: number) => {
    if (n === rate) {
      n = 0;
    }

    if (onPress) {
      onPress(n);
    }

    setRate(n);
  };

  useEffect(() => {
    if (disabled && initialRate) {
      setRate(initialRate);
    }
  }, [disabled, initialRate]);

  return (
    <Box gap={12}>
      <Box
        gap={gap}
        direction="row"
        alignItems="center"
        justifyContent="flex-start">
        {Array.from({length}).map((_, index) => (
          <StarIcon
            key={index}
            color={shouldFillN(index + 1) ? fillColor : emptyColor}
            width={starSize}
            height={starSize}
            disabled={disabled}
            onPress={() => setRateN(index + 1)}
          />
        ))}
      </Box>
      {!disabled && (
        <Box
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          alignSelf="stretch">
          <Typography variant="tip" color="black1">
            {'modals.rate.labels.bad'}
          </Typography>
          <Typography variant="tip" color="black1">
            {'modals.rate.labels.good'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export {StarRate};
