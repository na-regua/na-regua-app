import {ITicket} from '@/app/models';
import {Box, Button, Icons, Splashs, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {TicketViewActions, fetchTodayTickets} from '@/store/slicers';
import {Colors} from '@/theme';
import colors from '@/theme/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  BigActionStyled,
  BigActionTextStyled,
  CHContainerStyled,
  CHContentStyled,
  CHTabsContentStyled,
  CHTabsStyled,
  LineStyled,
  ShareQrButtonContentStyled,
  TicketStyled,
  TicketsBarberImageStyled,
} from './styles';

const CustomerHome: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/home'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  const {todayTickets} = useSelector((state: RootState) => state.cut);

  const [expandArr, setExpandArr] = useState<string[]>([]);

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const goToSettings = () => {
    navigation.navigate('/customer/settings');
  };

  const goToCut = () => {
    navigation.navigate('/customer/cut');
  };

  const goToQrScanner = () => {
    navigation.navigate('/customer/qr-scanner');
  };

  const getTodayTicketsData = async () => {
    await dispatch(fetchTodayTickets());
  };

  const openTicket = (ticket: ITicket) => {
    dispatch(TicketViewActions.setTicketView(ticket));

    navigation.navigate('/customer/on-ticket');
  };

  useEffect(() => {
    getTodayTicketsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expandTicket = (id: string) => {
    const isExpandedValue = isExpanded(id);
    if (isExpandedValue) {
      setExpandArr(expandArr.filter(item => item !== id));
    }

    if (!isExpandedValue) {
      setExpandArr(curr => [...curr, id]);
    }
  };

  const isExpanded = (id: string) => {
    return expandArr.includes(id);
  };

  return (
    <CHContainerStyled style={insetsStyles}>
      <Header.Container>
        <Header.User pressables={{user: goToSettings}} />
        <Header.Border />
      </Header.Container>
      <CHContentStyled>
        <View>
          <Typography variant="h2" weight="regular" color="black3">
            {'customer.home.titles.ask1'}
          </Typography>
          <Typography variant="h2" color="black3">
            {'customer.home.titles.ask2'}
          </Typography>
        </View>
        <BigActionStyled
          direction="row"
          onPress={goToCut}
          backgroundColor="secondary"
          underlayColor={Colors.secondaryHover}>
          <>
            <Splashs.BarberSplash />
            <BigActionTextStyled>
              <Typography variant="h4" weight="medium" color="white3">
                {'customer.home.actions.cut.title'}
              </Typography>
              <Typography variant="caption" color="white1" textAlign="left">
                {'customer.home.actions.cut.description'}
              </Typography>
            </BigActionTextStyled>
          </>
        </BigActionStyled>
        <LineStyled />
        <Button
          customContent={
            <ShareQrButtonContentStyled>
              <Icons.QRIcon color="main" disabled />
              <Typography variant="button" color="black3">
                {'customer.home.buttons.readQr'}
              </Typography>
            </ShareQrButtonContentStyled>
          }
          variant="ghost"
          onPress={goToQrScanner}
        />
        <LineStyled />
        <CHTabsStyled>
          <Typography variant="h4" color="black2">
            {'customer.home.tabs.attendance'}
          </Typography>
          <Typography variant="h6" color="default">
            {'customer.home.tabs.history'}
          </Typography>
        </CHTabsStyled>
        <CHTabsContentStyled>
          {todayTickets?.queue && (
            <TicketStyled
              expanded={isExpanded(todayTickets.queue._id)}
              onPress={() => expandTicket(todayTickets.queue._id)}>
              <Box
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Box direction="row" gap={12}>
                  <TicketsBarberImageStyled
                    source={{uri: todayTickets.queue.barber.avatar.url}}
                  />
                  <Box>
                    <Typography variant="body1" color="white3">
                      {todayTickets.queue.barber.name}
                    </Typography>
                    <Typography variant="caption" color="white1">
                      {`tickets.types.${todayTickets.queue.type}`}
                    </Typography>
                  </Box>
                </Box>
                {isExpanded(todayTickets.queue._id) && (
                  <Typography variant="h4" color="default" translate={false}>
                    {todayTickets.queue.queue?.position} {'º'}
                  </Typography>
                )}
              </Box>
              {isExpanded(todayTickets.queue._id) && (
                <LineStyled customColor={colors.default} />
              )}
              {isExpanded(todayTickets.queue._id) && (
                <Box direction="row" gap={12}>
                  <Button
                    colorScheme="danger"
                    title="buttons.leave"
                    translate
                  />
                  <Button
                    fillSpace
                    colorScheme="white"
                    title="buttons.open"
                    onPress={() => openTicket(todayTickets.queue)}
                  />
                </Box>
              )}
            </TicketStyled>
          )}
        </CHTabsContentStyled>
      </CHContentStyled>
    </CHContainerStyled>
  );
};

export default CustomerHome;
