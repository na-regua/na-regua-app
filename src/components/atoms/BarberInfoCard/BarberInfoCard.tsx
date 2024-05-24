import {IBarber} from '@/app/models';
import {Colors, Fonts} from '@/theme';
import {generateAddress} from '@/utils';
import React, {useMemo} from 'react';
import {ViewStyle} from 'react-native';
import {Box, IBoxProps} from '../Box/Box';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import {BarberInfoCardImageStyled, DotSeparatorStyled} from './styles';
import {hexPercentage} from '@/theme/colors';

interface IBarberInfoCardProps {
  barber: IBarber;
  titleWeight?: keyof typeof Fonts.weights;
  titleVariant?: keyof typeof Fonts.sizes;
  wrapperStyles?: IBoxProps;
  asCard?: boolean;
  isOpen?: boolean;
}

const BarberInfoCard: React.FC<IBarberInfoCardProps> = ({
  barber,
  titleWeight = 'medium',
  titleVariant = 'h5',
  wrapperStyles,
  asCard,
}) => {
  const cardStyles: ViewStyle = useMemo<ViewStyle>(() => {
    if (asCard) {
      return {
        backgroundColor: `${Colors.main}${hexPercentage[10]}`,
        borderRadius: 12,
        padding: 12,
        alignSelf: 'stretch',
      };
    }

    return {
      backgroundColor: 'transparent',
    };
  }, [asCard]);

  return (
    <Box gap={12} style={cardStyles} {...wrapperStyles}>
      <Box gap={12} direction="row" alignItems="center">
        <BarberInfoCardImageStyled
          source={{
            uri: barber.avatar.url,
          }}
        />
        <Box gap={2}>
          <Typography
            variant={titleVariant}
            weight={titleWeight}
            color="black3">
            {barber.name}
          </Typography>
          <Box gap={6} direction="row" alignItems="center">
            <Icons.StarIcon />
            <Typography variant="caption" color="black2" translate={false}>
              {barber.rating || 0}
            </Typography>
            <DotSeparatorStyled />
            <Typography variant="caption" color="black1">
              {barber.code}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box gap={12}>
        <Box gap={6} direction="row" alignItems="center">
          <Icons.TimeIcon width={14} height={14} color="main" />
          <Typography variant="caption" color="black2" translate={false}>
            {barber.config.worktime.start + ' - ' + barber.config.worktime.end}
          </Typography>
        </Box>
        <Box gap={6} direction="row" alignItems="flex-start">
          <Box paddings={{top: 3, bottom: 3}}>
            <Icons.MarkerIcon
              width={14}
              height={14}
              strokeWidth={1.2}
              color="main"
            />
          </Box>
          <Typography variant="caption" color="black2" translate={false}>
            {generateAddress(barber.address)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export {BarberInfoCard};
