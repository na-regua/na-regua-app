/* eslint-disable react/no-unstable-nested-components */
import React, {PropsWithChildren, forwardRef, useMemo} from 'react';

import {useKeyboardVisible} from '@/hooks';
import {Colors} from '@/theme';
import {gtDeviceHeight} from '@/theme/metrics';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Typography from '../Typography/Typography';
import {modalStyles} from './styles';

interface IModalProps extends PropsWithChildren {
  snapPoints?: (string | number)[];
  title?: string;
  autoSize?: boolean;
  height?: number;
  backgroundColor?: string;
  onClose?: () => void;
}

export const getModalSnapPointWithKeyboard = (
  modalHeight: number,
  keyboardHeight: number,
): (string | number)[] => {
  return gtDeviceHeight(modalHeight + keyboardHeight)
    ? ['100%']
    : [modalHeight + keyboardHeight];
};

const Modal = forwardRef<BottomSheetModal, IModalProps>(
  (
    {
      snapPoints = ['40%'],
      title,
      children,
      height = 0,
      backgroundColor,
      onClose,
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const {isKeyboardVisible, keyboardHeight} = useKeyboardVisible();

    const modalHeight = useMemo(
      () =>
        isKeyboardVisible
          ? getModalSnapPointWithKeyboard(height + 18, keyboardHeight)
          : [height + insets.bottom],
      [height, insets.bottom, isKeyboardVisible, keyboardHeight],
    );

    const modalBackgroundColor: ViewStyle = useMemo(
      () =>
        backgroundColor
          ? {backgroundColor: backgroundColor}
          : {backgroundColor: Colors.bgLight},
      [backgroundColor],
    );

    return (
      <BottomSheetModal
        ref={ref}
        backgroundComponent={props => (
          <View
            {...props}
            style={[props.style, modalStyles.background, modalBackgroundColor]}
          />
        )}
        backdropComponent={props => (
          <View {...props} style={[props.style, modalStyles.backdrop]} />
        )}
        snapPoints={height > 0 ? modalHeight : snapPoints}
        onDismiss={onClose}>
        <View style={modalStyles.content}>
          <Typography variant="h5" color="black3">
            {title}
          </Typography>
          {children}
        </View>
      </BottomSheetModal>
    );
  },
);

export default Modal;
