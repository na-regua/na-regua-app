import {
  AppStatusBar,
  Button,
  Modal,
  QRCode,
  Typography,
} from '@/components/atoms';
import {Header, ShareQRModal} from '@/components/molecules';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {RootState} from '@/store/Store';
import colors from '@/theme/colors';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {
  ActionsStyle,
  ContainerStyle,
  ContentStyle,
  QRContentStyle,
  styles,
} from './styles';

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

  const shareQRModalRef = useRef<BottomSheetModal>(null);

  const shareQR = async () => {
    if (shareQRModalRef.current) {
      shareQRModalRef.current?.present();
    }
  };

  const skip = () => {
    navigator.navigate(APP_ROUTES.BARBER_QUEUE);
  };

  return (
    <ContainerStyle
      style={insetsStyles}
      contentContainerStyle={styles.flexGrow1}>
      <AppStatusBar barStyle="light-content" />
      <Header showTitle={false} lightContent />
      <ContentStyle>
        {barber && (
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
          />
        </ActionsStyle>
      </ContentStyle>
      <Modal
        ref={shareQRModalRef}
        snapPoints={['100%']}
        backgroundColor={colors.main}>
        <ShareQRModal modalRef={shareQRModalRef} />
      </Modal>
    </ContainerStyle>
  );
};

export default BarberCompletedQr;
