import React, {useState} from 'react';
import {Box} from '../Box/Box';
import StarIcon from '../Icons/StarIcon/StarIcon';
import Typography from '../Typography/Typography';

interface StarRateProps {
  initialRate?: number;
  onPress?: (rate: number) => void;
  disabled?: boolean;
  showComment?: boolean;
  length?: number;
}

const StarRate: React.FC<StarRateProps> = ({
  initialRate,
  onPress,
  disabled,
  showComment,
  length = 5,
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

  return (
    <Box gap={12}>
      <Box
        gap={18}
        direction="row"
        alignItems="center"
        justifyContent="flex-start">
        {Array.from({length}).map((_, index) => (
          <StarIcon
            key={index}
            color={shouldFillN(index + 1) ? 'warning' : 'border'}
            width={24}
            height={24}
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
