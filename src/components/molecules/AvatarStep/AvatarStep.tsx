import {Avatar, Step} from '@/components/atoms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {styles} from './styles';

interface IAvatarStepProps {
  completed?: boolean;
  onAvatarChange: (file: Asset) => void;
}

const AvatarStep: React.FC<IAvatarStepProps> = ({
  completed,
  onAvatarChange,
}) => {
  const {t} = useTranslation();

  return (
    <Step
      title={t('barber.signUp.steps.4.title')}
      number={4}
      description={t('barber.signUp.steps.4.description')}
      completed={completed}>
      <View style={styles.avatarContainer}>
        <Avatar size={82} iconSize={32} onAvatarChange={onAvatarChange} />
      </View>
    </Step>
  );
};

export default AvatarStep;
