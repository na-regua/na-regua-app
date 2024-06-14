import {BarbersService} from '@/app/api';
import {IBarber} from '@/app/models';
import {
  AppStatusBar,
  BarberInfoCard,
  Button,
  Icons,
  Splashs,
  Typography,
} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {LinkingPrefixes, TRootStackParamList} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {CutActions, CutThunks} from '@/store/slicers';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Vibration} from 'react-native';
import {FadeIn, SlideInDown} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useDispatch} from 'react-redux';
import {OtherButtonContentStyled} from '../CustomerCut/components/CustomerAttendance/styles';
import {
  AnimatedSplashViewStyled,
  CameraStyles,
  CustomBottomSheetActionsStyled,
  CustomBottomSheetOverlayStyled,
  CustomBottomSheetStyled,
  QrScannerBorderStyled,
  QrScannerCardStyled,
  QrScannerContainerStyled,
} from './styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CustomerQrScanner: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/qr-scanner'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [barber, setBarber] = useState<IBarber | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [isReading, setIsReading] = useState(true);
  const [loadingBarber, setLoadingBarber] = useState(false);

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      const naReguaCode = codes.find(
        code =>
          code.type === 'qr' && code.value?.includes(LinkingPrefixes.Default),
      );

      if (naReguaCode) {
        onRead(naReguaCode);
      }
    },
  });

  const insetsStyles = {
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/customer/home');
    }
  };

  const requestPermissionFromUser = useCallback(async () => {
    if (!hasPermission) {
      await requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    requestPermissionFromUser();
  }, [requestPermissionFromUser]);

  const onRead = async (code: Code) => {
    Vibration.vibrate(400);

    const {value} = code;

    if (value) {
      const replaced = value.replace(LinkingPrefixes.Default, '').split('/')[1];

      const {data} = await BarbersService.getBarbers(replaced);

      if (data && data.content.length > 0) {
        setBarber(data.content[0]);
        setIsReading(false);
      }
    }
  };

  const onContinue = async () => {
    if (barber) {
      setLoadingBarber(true);

      await dispatch(CutThunks.fetchBarberServicesByBarberId(barber._id));
      await dispatch(CutThunks.fetchBarberTodayQueueByBarberId(barber._id));

      dispatch(CutActions.setCutSelectedBarber(barber));
      dispatch(CutActions.setCutStep('attendance'));
      dispatch(CutActions.setAttendanceType('queue'));

      navigation.navigate('/customer/cut');

      setLoadingBarber(false);
      setBarber(null);
      setIsReading(true);
    }
  };

  const clearReadData = () => {
    setIsReading(true);
    setBarber(null);
  };

  const CameraJSX =
    device && hasPermission ? (
      <Camera
        device={device}
        isActive={isReading}
        audio={false}
        style={CameraStyles}
        codeScanner={codeScanner}
      />
    ) : (
      <></>
    );

  return (
    <QrScannerContainerStyled style={insetsStyles}>
      <AppStatusBar color={Colors.border} />
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
      </Header.Container>
      <QrScannerCardStyled paddingBottom={insets.bottom + 18}>
        <Typography variant="h4" textAlign="center">
          {'customer.qrScan.title'}
        </Typography>
        <Typography variant="caption" color="black1" textAlign="center">
          {'customer.qrScan.subtitle'}
        </Typography>
        <QrScannerBorderStyled>{CameraJSX}</QrScannerBorderStyled>
      </QrScannerCardStyled>
      {!!barber && (
        <CustomBottomSheetOverlayStyled entering={FadeIn.duration(100)}>
          <AnimatedSplashViewStyled entering={SlideInDown.delay(400)}>
            <Splashs.BarberSplash size={140} />
          </AnimatedSplashViewStyled>
          <CustomBottomSheetStyled
            paddingBottom={insets.bottom}
            entering={SlideInDown.delay(100)}>
            <Typography variant="h4">
              {'customer.qrScan.found.title'}
            </Typography>
            <BarberInfoCard barber={barber} asCard />
            <CustomBottomSheetActionsStyled>
              <Button
                variant="ghost"
                colorScheme="primary"
                customContent={
                  <OtherButtonContentStyled>
                    <Icons.ArrowLeftIcon color="primary" disabled />
                    <Typography variant="button" color="primary">
                      {'customer.qrScan.found.buttons.other'}
                    </Typography>
                  </OtherButtonContentStyled>
                }
                onPress={clearReadData}
              />
              <Button
                title="customer.qrScan.found.buttons.continue"
                fillSpace
                onPress={onContinue}
                loading={loadingBarber}
              />
            </CustomBottomSheetActionsStyled>
          </CustomBottomSheetStyled>
        </CustomBottomSheetOverlayStyled>
      )}
    </QrScannerContainerStyled>
  );
};

export default CustomerQrScanner;
