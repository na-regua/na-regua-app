import {Avatar, Step} from '@/components/atoms';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {styles} from './styles';

interface IAvatarStepProps {
  completed?: boolean;
  onAvatarChange: (file: Asset) => void;
  canJumpTo?: boolean;
}

const AvatarStep: React.FC<IAvatarStepProps> = ({
  completed,
  onAvatarChange,
  canJumpTo,
}) => {
  const {t} = useTranslation();
  const [avatar, setAvatar] = useState<string>('');

  const handleAvatarChange = (file: Asset) => {
    if (file.base64) {
      setAvatar(`data:image/jpeg;base64,${file.base64}`);
    }
    onAvatarChange(file);
  };

  return (
    <Step
      title={t('barber.signUp.steps.4.title')}
      number={4}
      description={t('barber.signUp.steps.4.description')}
      completed={completed}
      disabled={!canJumpTo}>
      <View style={styles.avatarContainer}>
        <Avatar
          size={82}
          iconSize={32}
          onAvatarChange={handleAvatarChange}
          preview={avatar}
        />
      </View>
    </Step>
  );
};

export default AvatarStep;
