import {BarbersService} from '@/app/api';
import {IBarber} from '@/app/models';
import {Button, Icons, Splashs, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {LinkingPrefixes, TRootStackParamList} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {CutActions, fetchBarberServices} from '@/store/slicers';
import {generateAddress} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Vibration} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {FadeIn, SlideInDown} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {
  AttendanceBarberInfoItemStyled,
  AttendanceBarberInfoStyled,
  AttendanceBarberItemImageStyled,
  AttendanceBarberItemStyled,
  AttendanceBarberItemTitleStyled,
  OtherButtonContentStyled,
} from '../CustomerCut/styles';
import {
  AnimatedSplashViewStyled,
  BarberInfoStyled,
  CameraStyle,
  CustomBottomSheetActionsStyled,
  CustomBottomSheetOverlayStyled,
  CustomBottomSheetStyled,
  QrCodeContentStyled,
  QrScannerBorderStyled,
  QrScannerCardStyled,
  QrScannerContainerStyled,
} from './styles';

const CustomerQrScanner: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/qr-scanner'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [isReading, setIsReading] = useState(true);
  const [barber, setBarber] = useState<IBarber | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const [loadingBarber, setLoadingBarber] = useState(false);

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const CAM_HEIGHT = 320;

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/customer/home');
    }
  };

  const onRead = async (event: BarCodeReadEvent) => {
    Vibration.vibrate(400);

    if (event.data.includes(LinkingPrefixes.Default)) {
      const replaced = event.data
        .replace(LinkingPrefixes.Default, '')
        .split('/')[1];

      const {data} = await BarbersService.getBarbers(replaced);

      if (data && data.length > 0) {
        setBarber(data[0]);
        setIsReading(false);
      }
    }
  };

  const onContinue = async () => {
    if (barber) {
      setLoadingBarber(true);

      dispatch(CutActions.setCutSelectedBarber(barber));
      dispatch(CutActions.setCutStep('attendance'));
      dispatch(CutActions.setAttendanceType('queue'));

      await dispatch(fetchBarberServices(barber._id));

      navigation.navigate('/customer/cut');

      setLoadingBarber(false);
    }
  };

  const clearReadData = () => {
    setIsReading(true);
    setBarber(null);
  };

  return (
    <QrScannerContainerStyled style={insetsStyles}>
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
      </Header.Container>
      <QrCodeContentStyled>
        <QrScannerCardStyled>
          <Typography variant="h4" textAlign="center">
            {'customer.qrScan.title'}
          </Typography>
          <Typography variant="caption" color="black1" textAlign="center">
            {'customer.qrScan.subtitle'}
          </Typography>
          <QrScannerBorderStyled height={CAM_HEIGHT}>
            <RNCamera
              style={CameraStyle}
              onBarCodeRead={event => isReading && onRead(event)}
              captureAudio={false}
            />
          </QrScannerBorderStyled>
        </QrScannerCardStyled>
      </QrCodeContentStyled>
      {!!barber && (
        <CustomBottomSheetOverlayStyled entering={FadeIn.duration(100)}>
          <AnimatedSplashViewStyled entering={SlideInDown.delay(400)}>
            <Splashs.BarberSplash size={140} />
          </AnimatedSplashViewStyled>
          <CustomBottomSheetStyled
            paddingBottom={insetsStyles.paddingBottom}
            entering={SlideInDown.delay(100)}>
            <Typography variant="h4">
              {'customer.qrScan.found.title'}
            </Typography>
            <BarberInfoStyled>
              <AttendanceBarberItemStyled>
                <AttendanceBarberItemImageStyled
                  source={{
                    uri: barber.avatar.url,
                  }}
                />
                <AttendanceBarberItemTitleStyled>
                  <Typography variant="h6" color="black3">
                    {barber.name}
                  </Typography>
                  <AttendanceBarberInfoItemStyled>
                    <Icons.StarIcon />
                    <Typography
                      variant="caption"
                      color="black3"
                      translate={false}>
                      {'4.5'}
                    </Typography>
                  </AttendanceBarberInfoItemStyled>
                </AttendanceBarberItemTitleStyled>
              </AttendanceBarberItemStyled>
              <AttendanceBarberInfoStyled>
                <AttendanceBarberInfoItemStyled>
                  <Icons.TimeIcon width={16} height={16} color="main" />
                  <Typography
                    variant="caption"
                    color="black2"
                    translate={false}>
                    {barber.config.workTime.start +
                      ' - ' +
                      barber.config.workTime.end}
                  </Typography>
                </AttendanceBarberInfoItemStyled>
                <AttendanceBarberInfoItemStyled>
                  <Icons.MarkerIcon color="main" />
                  <Typography
                    variant="caption"
                    color="black2"
                    translate={false}>
                    {generateAddress(barber.address)}
                  </Typography>
                </AttendanceBarberInfoItemStyled>
              </AttendanceBarberInfoStyled>
            </BarberInfoStyled>
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
