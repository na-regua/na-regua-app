import React from 'react';

import {default as QR, QRCodeProps} from 'react-native-qrcode-svg';
import {QRWrapperStyle} from './styles';
import {ViewStyle} from 'react-native';

interface IQRCodeProps {
  qrCodeProps: QRCodeProps;
  size?: number;
  padding?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const QRCode: React.FC<IQRCodeProps> = ({
  qrCodeProps,
  size = 64,
  padding = 4,
  borderRadius = 4,
  style,
}) => {
  return (
    <QRWrapperStyle
      style={style}
      size={size}
      padding={padding}
      borderRadius={borderRadius}>
      <QR {...qrCodeProps} size={size} />
    </QRWrapperStyle>
  );
};

export default QRCode;
