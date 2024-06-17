import {NotificationService} from '@/app/api';
import {Button, Loader, Typography} from '@/components/atoms';
import {Header, NotificationCenterItem} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  changeGetNofiticationFilters,
  fetchUserNotifications,
} from '@/store/slicers';
import {Colors} from '@/theme';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  LoaderContainerStyled,
  NotificationContentStyle,
  NotificationHeaderRowStyled,
  NotificationHeaderStyled,
  NotificationListStyle,
  NotificationsContainerStyled,
  TabGroupStyled,
  TabItemStyled,
  TabsContainerStyled,
} from './styles';

const Notifications: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/user/notifications'>
> = ({navigation}) => {
  const TABS = {
    ALL: 0,
    UNREAD: 1,
  };
  const [activeTab, setActiveTab] = useState(0);
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
  const dispatch = useDispatch<AppDispatch>();
  const {
    userNotifications,
    loading: loadingNotifications,
    hasUnread,
  } = useSelector((state: RootState) => state.notify);
  const {user} = useSelector((state: RootState) => state.auth);
  const isScreenFocused = useIsFocused();

  const getUserNotifications = useCallback(() => {
    dispatch(fetchUserNotifications());
  }, [dispatch]);

  useEffect(() => {
    getUserNotifications();
  }, [getUserNotifications, isScreenFocused]);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      if (user?.role === 'customer') {
        navigation.navigate('/customer/home');
      }

      if (user?.role !== 'customer') {
        navigation.navigate('/barber/queue');
      }
    }
  };

  const changeTab = async (tab: number) => {
    setActiveTab(tab);

    const readValue = tab === TABS.UNREAD ? false : undefined;

    dispatch(changeGetNofiticationFilters({read: readValue}));
    await dispatch(fetchUserNotifications());
  };

  const markAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();

      await dispatch(fetchUserNotifications({reload: false}));
    } catch (error) {
      if (error instanceof AxiosError) {
      }
    }
  };

  return (
    <NotificationsContainerStyled style={[insetsStyles]}>
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
        <Header.Border />
      </Header.Container>
      <NotificationContentStyle>
        <NotificationHeaderStyled>
          <NotificationHeaderRowStyled>
            <Typography variant="h5" color="black3">
              {'generic.notifications.title'}
            </Typography>
            <Button
              disabled={loadingNotifications || !hasUnread}
              onPress={markAllAsRead}
              variant="text"
              title="generic.notifications.markAllRead"
            />
          </NotificationHeaderRowStyled>
          <Typography variant="caption" color="black1">
            {'generic.notifications.subtitle'}
          </Typography>
        </NotificationHeaderStyled>
        <TabGroupStyled>
          <TabsContainerStyled>
            <TabItemStyled
              active={activeTab === TABS.ALL}
              onPress={() => changeTab(TABS.ALL)}>
              <Typography
                variant="button"
                color={activeTab === TABS.ALL ? 'primary' : 'default'}>
                {'generic.notifications.tabs.all'}
              </Typography>
            </TabItemStyled>
            <TabItemStyled
              active={activeTab === TABS.UNREAD}
              onPress={() => changeTab(TABS.UNREAD)}>
              <Typography
                variant="button"
                color={activeTab === TABS.UNREAD ? 'primary' : 'default'}>
                {'generic.notifications.tabs.unread'}
              </Typography>
            </TabItemStyled>
          </TabsContainerStyled>
          <NotificationListStyle showsVerticalScrollIndicator={false}>
            {!loadingNotifications ? (
              userNotifications.map(notification => (
                <NotificationCenterItem
                  key={notification._id}
                  {...notification}
                />
              ))
            ) : (
              <LoaderContainerStyled>
                <Loader color={Colors.main} />
              </LoaderContainerStyled>
            )}
          </NotificationListStyle>
        </TabGroupStyled>
      </NotificationContentStyle>
    </NotificationsContainerStyled>
  );
};

export default Notifications;
