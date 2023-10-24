/* eslint-disable react/no-unstable-nested-components */
import React, {PropsWithChildren, forwardRef} from 'react';

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {View} from 'react-native';
import Typography from '../Typography/Typography';
import {modalStyles} from './styles';

interface IModalProps extends PropsWithChildren {
  snapPoints?: (string | number)[];
  title?: string;
  autoSize?: boolean;
}

const Modal = forwardRef<BottomSheetModal, IModalProps>(
  ({snapPoints = ['40%'], title, children}, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        backgroundComponent={props => (
          <View {...props} style={[props.style, modalStyles.background]} />
        )}
        backdropComponent={props => (
          <View {...props} style={[props.style, modalStyles.backdrop]} />
        )}
        snapPoints={snapPoints}>
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
