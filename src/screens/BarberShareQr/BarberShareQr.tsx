import {Button, QRCode, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {RootState} from '@/store/Store';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import {
  ActionsStyle,
  ContainerStyle,
  ContentStyle,
  QRContentStyle,
  styles,
} from './styles';
import colors from '@/theme/colors';

const BarberShareQr: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
  const {barber} = useSelector((state: RootState) => state.auth);

  return (
    <ContainerStyle
      style={insetsStyles}
      contentContainerStyle={styles.flexGrow1}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.bgLight} />
      <Header showTitle={false} lightContent />
      <ContentStyle>
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
            padding={12}
            size={152}
            qrCodeProps={{
              value: 'https://www.google.com',
              color: colors.black3,
            }}
          />
          <Typography variant="h1" color="white3">
            {barber && barber.name}
          </Typography>
          <Typography variant="h4" color="white3">
            {barber && barber.code}
          </Typography>
        </QRContentStyle>
        <ActionsStyle>
          <Button
            variant="outlined"
            colorScheme="white"
            title={t('barber.completeQR.buttons.skip')}
          />
          <Button
            colorScheme="white"
            title={t('barber.completeQR.buttons.share')}
          />
        </ActionsStyle>
      </ContentStyle>
    </ContainerStyle>
  );
};

export default BarberShareQr;
