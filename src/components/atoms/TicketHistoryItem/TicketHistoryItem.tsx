import {ITicket} from '@/app/models';
import {
  OnTicketPrice,
  OnTicketServiceInfo,
} from '@/screens/CustomerOnTicket/components';
import {LineStyled} from '@/screens/CustomerOnTicket/styles';
import {Colors} from '@/theme';
import {TColorsType} from '@/theme';
import {format} from 'date-fns';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ViewStyle} from 'react-native';
import {FadeInUp} from 'react-native-reanimated';
import {BarberInfoCard} from '../BarberInfoCard/BarberInfoCard';
import {Box} from '../Box/Box';
import Icons from '../Icons/Icons';
import {StarRate} from '../StarRate/StarRate';
import Typography from '../Typography/Typography';
import {THITouchableContainer} from './styles';

interface ITicketHistoryItemProps {
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
}

export const TICKET_HISTORY_ITEM_HEIGHT = 140;

const TicketHistoryItem: React.FC<ITicketHistoryItemProps> = ({
  backgroundColor = 'border',
  backgroundHoverColor = 'borderHover',
  ticket,
  onPress,
  zIndex,
  selected,
  onChangeHeight,
  animatedStyle,
  isAfterSelected,
  isBeforeSelected,
}) => {
  const {t} = useTranslation();

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

  const services = useMemo(
    () =>
      `${ticket.service.name}${
        ticket.additional_services
          ? ticket.additional_services.map(s => ' + ' + s.name)
          : ''
      }`,
    [ticket],
  );

  const RateJSX = ticket.rate ? (
    <Box
      gap={6}
      alignItems="center"
      justifyContent="center"
      alignSelf="stretch">
      <StarRate
        starSize={18}
        disabled
        initialRate={ticket.rate.rating}
        gap={6}
        emptyColor="black1"
      />
      <Typography
        variant="caption"
        color="black1"
        style={{fontStyle: 'italic'}}>
        {ticket.rate.comment
          ? `"${ticket.rate.comment}"`
          : 'customer.onTicket.info.noComment'}
      </Typography>
    </Box>
  ) : (
    <Box
      direction="row"
      alignItems="center"
      gap={6}
      justifyContent="center"
      alignSelf="stretch">
      <Icons.StarIcon width={14} height={14} filled={false} color="black1" />
      <Typography variant="caption" color="black1">
        {'empty.rate'}
      </Typography>
    </Box>
  );

  return (
    <THITouchableContainer
      backgroundColor={backgroundColor}
      backgroundHoverColor={backgroundHoverColor}
      onPress={() => onPress && onPress(ticket)}
      _zIndex={zIndex}
      selected={selected}
      activeOpacity={1}
      style={[animatedStyle, shadow]}
      onLayout={event => {
        onChangeHeight && onChangeHeight(event.nativeEvent.layout.height);
      }}>
      {isBeforeSelected && ticket.servedAt && (
        <Box alignItems="center" justifyContent="center">
          <Typography variant="caption" color="placeholder">
            {format(new Date(ticket.servedAt), t('dates.full'))}
          </Typography>
        </Box>
      )}

      {ticket.barber && (
        <BarberInfoCard
          avatarRadius={12}
          barber={ticket.barber}
          showInfo={false}
          customSubtitle={
            !selected ? (
              <Box
                direction="row"
                alignItems="center"
                justifyContent="flex-start">
                <Typography variant="caption" color="placeholder">
                  {services}
                </Typography>
              </Box>
            ) : (
              <></>
            )
          }
        />
      )}
      <>
        {selected && (
          <Box alignSelf="stretch" gap={12} entering={FadeInUp}>
            <OnTicketServiceInfo
              service={ticket.service}
              additionalServices={ticket.additional_services}
            />
            {RateJSX}
            <LineStyled backgroundColor="default" />
            <OnTicketPrice
              service={ticket.service}
              additionalServices={ticket.additional_services}
              showLine={false}
              wrapperProps={{paddings: {}}}
            />
          </Box>
        )}
      </>
      <>{!selected && RateJSX}</>
      <>
        {isAfterSelected && ticket.servedAt && (
          <Box alignItems="center" justifyContent="center">
            <Typography variant="caption" color="placeholder">
              {format(new Date(ticket.servedAt), t('dates.full'))}
            </Typography>
          </Box>
        )}
      </>
      <>
        {selected && ticket.servedAt && (
          <Box alignItems="center" justifyContent="center">
            <Typography variant="body1" color="black3">
              {format(new Date(ticket.servedAt), t('dates.full'))}
            </Typography>
          </Box>
        )}
      </>
    </THITouchableContainer>
  );
};

export {TicketHistoryItem};
