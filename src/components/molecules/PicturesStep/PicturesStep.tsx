import {FileUpload, Step} from '@/components/atoms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

interface IPicturesStepProps {
  onFileUpload?: (files: string[]) => void;
  completed?: boolean;
  thumbs: string[];
  canJumpTo?: boolean;
}

const PicturesStep: React.FC<IPicturesStepProps> = ({
  onFileUpload,
  completed,
  thumbs,
  canJumpTo,
}) => {
  const {t} = useTranslation();

  return (
    <Step
      title={t('barber.signUp.steps.3.title')}
      description={t('barber.signUp.steps.3.description')}
      number={3}
      disabled={!canJumpTo}
      completed={completed}>
      <View style={styles.fileUploadRow}>
        <FileUpload
          initialMiniatures={thumbs}
          onFileUpload={onFileUpload}
          limit={3}
        />
      </View>
    </Step>
  );
};

const styles = StyleSheet.create({
  fileUploadRow: {
    flex: 1,
  },
});

export default PicturesStep;
