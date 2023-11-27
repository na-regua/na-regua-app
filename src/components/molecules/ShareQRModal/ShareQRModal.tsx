import React, {useRef, useState} from 'react';

import {Button, QRCode, Typography} from '@/components/atoms';
import {RootState} from '@/store/Store';
import colors from '@/theme/colors';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import Share from 'react-native-share';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {useSelector} from 'react-redux';
import {ContainerStyle, QRContentStyle, styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native';

interface IShareQRModalProps {
  modalRef: React.RefObject<BottomSheetModal | null>;
}

const ShareQRModal: React.FC<IShareQRModalProps> = ({modalRef}) => {
  const insets = useSafeAreaInsets();
  const insetsStyles: ViewStyle = {
    paddingBottom: insets.bottom,
  };

  const {t} = useTranslation();
  const ref = useRef<ViewShot>(null);
  const {barber} = useSelector((state: RootState) => state.auth);

  const [sharing, setSharing] = useState(false);

  const close = () => {
    if (modalRef.current) {
      modalRef.current.dismiss();
    }
  };

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

  if (!barber) {
    return null;
  }

  return (
    <ContainerStyle style={insetsStyles}>
      <ViewShot style={styles.viewShot} ref={ref}>
        <QRContentStyle>
          <Typography variant="body1" color="white3" style={styles.textCenter}>
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

      <Button
        variant="outlined"
        colorScheme="white"
        title={t('barber.shareQR.buttons.close')}
        onPress={close}
      />
      <Button
        colorScheme="white"
        title={t('barber.shareQR.buttons.save')}
        onPress={shareQR}
        loading={sharing}
      />
    </ContainerStyle>
  );
};

export default ShareQRModal;
