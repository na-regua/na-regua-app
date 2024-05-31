import {INotify} from '@/app/models';
import {AppDispatch} from '@/store/Store';
import {removeNotification} from '@/store/slicers';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {FadeInUp, SlideOutUp} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import {NotifyContainer} from './styles';

interface INotifyProps extends INotify {}

const Notify: React.FC<INotifyProps> = ({
  id,
  type,
  message,
  translate = true,
  duration = 3000,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveNotification = () => {
    dispatch(removeNotification(id));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleRemoveNotification();
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotifyContainer
      type={type}
      activeOpacity={0.6}
      onPress={handleRemoveNotification}
      entering={FadeInUp.duration(300)}
      exiting={SlideOutUp.duration(300)}>
      {type === 'error' && (
        <View>
          <Icons.DeleteIcon color="white3" />
        </View>
      )}
      <Typography variant="button" color="white3">
        {translate ? t(message) : message}
      </Typography>
    </NotifyContainer>
  );
};

export default Notify;
