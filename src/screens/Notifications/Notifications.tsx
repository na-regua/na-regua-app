import {Button, Loader, Typography} from '@/components/atoms';
import {Header, NotificationCenterItem} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  changeGetNofiticationFilters,
  fetchUserNotifications,
} from '@/store/slicers';
import {Colors} from '@/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
  const {userNotifications, loading: loadingNotifications} = useSelector(
    (state: RootState) => state.notify,
  );

  const getUserNotifications = useCallback(() => {
    dispatch(fetchUserNotifications());
  }, [dispatch]);

  useEffect(() => {
    getUserNotifications();
  }, [getUserNotifications]);

  const onBackPress = () => {
    navigation.goBack();
  };

  const changeTab = async (tab: number) => {
    setActiveTab(tab);

    const readValue = tab === TABS.UNREAD ? false : undefined;

    dispatch(changeGetNofiticationFilters({read: readValue}));
    await dispatch(fetchUserNotifications());
  };

  const markAllAsRead = () => {};

  return (
    <NotificationsContainerStyled style={[insetsStyles]}>
      <Header
        showActions={false}
        showBack
        showBorder
        onBackPress={onBackPress}
      />
      <NotificationContentStyle>
        <NotificationHeaderStyled>
          <NotificationHeaderRowStyled>
            <Typography variant="h5" color="black3">
              {'generic.notifications.title'}
            </Typography>
            <Button
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
                <Loader size="128" color={Colors.main} />
              </LoaderContainerStyled>
            )}
          </NotificationListStyle>
        </TabGroupStyled>
      </NotificationContentStyle>
    </NotificationsContainerStyled>
  );
};

export default Notifications;
