import {ITicket} from '@/app/models';
import {Colors, TColorsType} from '@/theme';
import React, {useMemo} from 'react';
import {ViewStyle} from 'react-native';

import {format} from 'date-fns';
import {BarberInfoCard} from '../BarberInfoCard/BarberInfoCard';
import {Box} from '../Box/Box';
import {THITouchableContainer} from '../TicketHistoryItem/styles';
import Typography from '../Typography/Typography';
import {OnTicketServiceInfo} from '@/screens';

type Props = {
  ticket: ITicket;
  backgroundColor?: TColorsType;
  backgroundHoverColor?: TColorsType;
  onPress?: (ticket: ITicket) => void;
  zIndex?: number;
  selected?: boolean;
  isAfterSelected?: boolean;
  isBeforeSelected?: boolean;
  onChangeHeight?: (height: number) => void;
  animatedStyle?: ViewStyle;
};

const ScheduleTicketItem: React.FC<Props> = ({
  ticket,
  backgroundColor = 'white3',
  backgroundHoverColor = 'white2',
  onPress,
  zIndex,
  animatedStyle,
  isAfterSelected,
  isBeforeSelected,
  onChangeHeight,
  selected,
}) => {
  const shadow: ViewStyle = useMemo(() => {
    if (selected) {
      return {
        shadowColor: Colors.black1,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Android
        elevation: 3,
      };
    }

    if (isBeforeSelected) {
      return {
        shadowColor: Colors.black1,
        shadowOffset: {
          height: -8,
          width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // Android
        elevation: 3,
      };
    }

    if (isAfterSelected) {
      return {
        shadowColor: Colors.black1,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // Android
        elevation: 3,
      };
    }

    return {};
  }, [isBeforeSelected, isAfterSelected, selected]);

  return (
    <THITouchableContainer
      backgroundColor={backgroundColor}
      backgroundHoverColor={backgroundHoverColor}
      _zIndex={zIndex}
      onPress={() => onPress && onPress(ticket)}
      activeOpacity={1}
      style={[animatedStyle, shadow]}
      onLayout={event => {
        onChangeHeight && onChangeHeight(event.nativeEvent.layout.height);
      }}
      height={100}>
      <Box gap={18} alignItems="center">
        <BarberInfoCard
          wrapperStyles={{width: '100%'}}
          barber={ticket.barber}
          showInfo={selected}
        />
        {selected && (
          <OnTicketServiceInfo
            service={ticket.service}
            additionalServices={ticket.additional_services}
          />
        )}
        <Box alignItems="center">
          <Typography
            variant={selected ? 'body1' : 'caption'}
            color={selected ? 'black3' : 'black1'}>
            {format(new Date(ticket.schedule?.date || ''), 'dd/MM/yyyy')} -{' '}
            {ticket.schedule?.time}
          </Typography>
        </Box>
      </Box>
    </THITouchableContainer>
  );
};

export default ScheduleTicketItem;
