import {FileUpload, Step} from '@/components/atoms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Asset} from 'react-native-image-picker';

interface IPicturesStepProps {
  onFileUpload?: (files: Asset[]) => void;
  completed?: boolean;
  thumbs: Asset[];
}

const PicturesStep: React.FC<IPicturesStepProps> = ({
  onFileUpload,
  completed,
  thumbs,
}) => {
  const {t} = useTranslation();

  return (
    <Step
      title={t('barber.signUp.steps.3.title')}
      description={t('barber.signUp.steps.3.description')}
      number={3}
      completed={completed}>
      <View style={styles.fileUploadRow}>
        <FileUpload assets={thumbs} onFileUpload={onFileUpload} limit={3} />
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
