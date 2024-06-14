import {
  AppStatusBar,
  Box,
  Button,
  CoreSwitch,
  Icons,
  Typography,
} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  PERMISSIONS,
  check,
  checkNotifications,
  openSettings,
  request,
  requestNotifications,
} from 'react-native-permissions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import {useDispatch, useSelector} from 'react-redux';
import {
  ContainerStyle,
  PermissionItemStyle,
  ScrollContentStyle,
} from './styles';
import {createNotification} from '@/store/slicers';

const GALLERY_PERMISSONS =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

const Permissions: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/user/permissions'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
  const dispatch = useDispatch<AppDispatch>();
  const systemNotifications = useSelector(
    (state: RootState) => state.notify.systemNotifications,
  );

  const {user} = useSelector((state: RootState) => state.auth);

  const [hasNotificationPermission, setHasNotificationPermission] =
    useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);

  const fetchHasPermissions = async () => {
    const {status: notificationsStatus} = await checkNotifications();

    const isNotificationGranted = notificationsStatus === 'granted';
    const galleryStatus = await check(GALLERY_PERMISSONS);
    const isGalleryGranted = galleryStatus === 'granted';
    setHasNotificationPermission(isNotificationGranted);
    setHasGalleryPermission(isGalleryGranted);
  };

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  useEffect(() => {
    fetchHasPermissions();
  }, []);

  if (!user) {
    return null;
  }

  const emitGrantedAlert = () => {
    // prevent emit twice
    if (
      !systemNotifications.some(
        notification => notification.id === 'has_permission',
      )
    ) {
      dispatch(
        createNotification({
          id: 'has_permission',
          message: 'generic.permissions.alert',
          type: 'default',
          duration: 2000,
        }),
      );
    }
  };

  const askForCameraPermission = async () => {
    if (hasCameraPermission) {
      emitGrantedAlert();
    }

    await requestCameraPermission();
  };

  const askForMicrophonePermission = async () => {
    if (hasMicrophonePermission) {
      emitGrantedAlert();
    }

    await requestMicrophonePermission();
  };

  const askForNotificationPermission = async () => {
    if (hasNotificationPermission) {
      emitGrantedAlert();
    }

    const {status} = await requestNotifications(['alert', 'badge']);
    const isGranted = status === 'granted';
    setHasNotificationPermission(isGranted);
  };

  const askForGalleryPermissions = async () => {
    if (hasGalleryPermission) {
      emitGrantedAlert();
    }

    const status = await request(GALLERY_PERMISSONS);
    const isGranted = status === 'granted';
    setHasGalleryPermission(isGranted);
  };

  const onOpenConfig = () => {
    openSettings();
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      if (user.role === 'customer') {
        navigation.navigate('/customer/settings');
      }

      if (user.role !== 'customer') {
        navigation.navigate('/barber/settings');
      }
    }
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
        <Header.Border />
      </Header.Container>
      <ScrollContentStyle showsVerticalScrollIndicator={false}>
        <Box gap={6}>
          <Typography variant="h5" color="black3">
            {'generic.permissions.title'}
          </Typography>
          <Typography variant="body2" color="black1">
            {'generic.permissions.subtitle'}
          </Typography>
        </Box>
        <Box gap={18} flex={1}>
          <PermissionItemStyle>
            <Box direction="row" alignItems="center" gap={12}>
              <Icons.BellIcon
                width={24}
                height={24}
                strokeWidth={1.5}
                color="black2"
              />
              <Box gap={2}>
                <Typography variant="body1" color="black2">
                  {'generic.permissions.items.notifications.title'}
                </Typography>
                <Typography variant="tip" color="black1">
                  {'generic.permissions.items.notifications.subtitle'}
                </Typography>
              </Box>
            </Box>
            <CoreSwitch
              waitForvalue
              active={hasNotificationPermission}
              onPress={askForNotificationPermission}
            />
          </PermissionItemStyle>
          <PermissionItemStyle>
            <Box direction="row" alignItems="center" gap={12}>
              <Icons.CameraIcon
                width={24}
                height={24}
                strokeWidth={1.5}
                color="black2"
              />
              <Box gap={2}>
                <Typography variant="body1" color="black2">
                  {'generic.permissions.items.cam.title'}
                </Typography>
                <Typography variant="tip" color="black1">
                  {'generic.permissions.items.cam.subtitle'}
                </Typography>
              </Box>
            </Box>
            <CoreSwitch
              waitForvalue
              active={hasCameraPermission}
              onPress={askForCameraPermission}
            />
          </PermissionItemStyle>
          <PermissionItemStyle>
            <Box direction="row" alignItems="center" gap={12}>
              <Icons.MicIcon
                width={24}
                height={24}
                strokeWidth={1.5}
                color="black2"
              />
              <Box gap={2}>
                <Typography variant="body1" color="black2">
                  {'generic.permissions.items.mic.title'}
                </Typography>
                <Typography variant="tip" color="black1">
                  {'generic.permissions.items.mic.subtitle'}
                </Typography>
              </Box>
            </Box>
            <CoreSwitch
              waitForvalue
              onPress={askForMicrophonePermission}
              active={hasMicrophonePermission}
            />
          </PermissionItemStyle>
          <PermissionItemStyle>
            <Box direction="row" alignItems="center" gap={12}>
              <Icons.GalleryIcon
                width={24}
                height={24}
                strokeWidth={1.5}
                color="black2"
              />
              <Box gap={2}>
                <Typography variant="body1" color="black2">
                  {'generic.permissions.items.gallery.title'}
                </Typography>
                <Typography variant="tip" color="black1">
                  {'generic.permissions.items.gallery.subtitle'}
                </Typography>
              </Box>
            </Box>
            <CoreSwitch
              waitForvalue
              active={hasGalleryPermission}
              onPress={askForGalleryPermissions}
            />
          </PermissionItemStyle>
        </Box>
        <Button
          colorScheme="primary"
          title="generic.permissions.buttons.openConfig"
          onPress={onOpenConfig}
        />
      </ScrollContentStyle>
    </ContainerStyle>
  );
};

export default Permissions;
