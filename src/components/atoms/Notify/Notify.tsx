import {INotify} from '@/app/models';
import {AppDispatch} from '@/store/Store';
import {removeNotification} from '@/store/slicers';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Typography from '../Typography/Typography';
import {NotifyContainer} from './styles';
import {View} from 'react-native';
import Icons from '../Icons/Icons';

interface INotifyProps extends INotify {}

const Notify: React.FC<INotifyProps> = ({id, type, message}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveNotification = () => {
    dispatch(removeNotification(id));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleRemoveNotification();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotifyContainer
      type={type}
      activeOpacity={0.8}
      onPress={handleRemoveNotification}>
      {type === 'error' && (
        <View>
          <Icons.DeleteIcon color="white3" />
        </View>
      )}
      <Typography variant="button" color="white3">
        {message}
      </Typography>
    </NotifyContainer>
  );
};

export default Notify;
