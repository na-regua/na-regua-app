import {Icons, Typography} from '@/components/atoms';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

const BarberServices: React.FC = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backlink}>
        <Icons.ArrowLeftIcon width={18} color="black1" />
        <Typography variant="button" color="black1">
          {t('barber.services.goBack')}
        </Typography>
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Typography variant="h5" color="black3">
          {t('barber.services.title')}
        </Typography>
        <Typography variant="body1" color="black1">
          {t('barber.services.subtitle')}
        </Typography>
      </View>
    </View>
  );
};

export default BarberServices;
