import {Button, QRCode, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {RootState} from '@/store/Store';
import colors from '@/theme/colors';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import {
  ActionsStyle,
  ContainerStyle,
  ContentStyle,
  QRContentStyle,
  styles,
} from './styles';
import Share from 'react-native-share';
import {APP_ROUTES, useAppNavigation} from '@/navigation';

const BarberCompletedQr: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigator = useAppNavigation();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
  const {barber} = useSelector((state: RootState) => state.auth);

  const [sharing, setSharing] = useState(false);
  const ref = useRef<ViewShot>(null);

  const shareQR = async () => {
    setSharing(true);

    setTimeout(async () => {
      try {
        const uri = await captureRef(ref, {format: 'png', quality: 1});

        await Share.open({url: uri});

        setTimeout(() => {
          setSharing(false);
        }, 500);
      } catch (error) {
        setSharing(false);
      }
    }, 500);
  };

  const skip = () => {
    navigator.navigate(APP_ROUTES.BARBER_QUEUE);
  };

  return (
    <ContainerStyle
      style={insetsStyles}
      contentContainerStyle={styles.flexGrow1}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.bgLight} />
      <Header showTitle={false} lightContent />
      <ContentStyle>
        {barber && !sharing && (
          <QRContentStyle>
            <Typography variant="h2" color="white3">
              {t('barber.completeQR.title')}
            </Typography>
            <Typography
              variant="body1"
              color="white1"
              style={styles.textAlignCenter}>
              {t('barber.completeQR.subtitle')}
            </Typography>
            <QRCode
              style={styles.qrWrapper}
              padding={12}
              size={152}
              qrCodeProps={{
                value: 'https://www.google.com',
                color: colors.black3,
              }}
            />
            <Typography variant="h4" color="white1">
              {barber.code}
            </Typography>
          </QRContentStyle>
        )}
        {barber && sharing && (
          <ViewShot style={styles.viewShot} ref={ref}>
            <QRContentStyle>
              <Typography variant="body1" color="white3">
                {t('barber.shareQR.subtitle')}
              </Typography>

              <QRCode
                style={styles.qrWrapper}
                padding={12}
                size={152}
                qrCodeProps={{
                  value: 'https://www.google.com',
                  color: colors.black3,
                }}
              />

              <Typography variant="h1" color="white3">
                {barber.name}
              </Typography>
              <Typography variant="h4" color="white1">
                {barber.code}
              </Typography>
            </QRContentStyle>
          </ViewShot>
        )}
        <ActionsStyle>
          <Button
            variant="outlined"
            colorScheme="white"
            title={t('barber.completeQR.buttons.skip')}
            onPress={skip}
          />
          <Button
            colorScheme="white"
            title={t('barber.completeQR.buttons.share')}
            onPress={shareQR}
            loading={sharing}
          />
        </ActionsStyle>
      </ContentStyle>
    </ContainerStyle>
  );
};

export default BarberCompletedQr;
