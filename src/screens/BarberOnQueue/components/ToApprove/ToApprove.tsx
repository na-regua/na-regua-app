import React = require('react');
import {QueueService} from '@/app/api';
import {ITicket} from '@/app/models';
import {Button, Typography} from '@/components/atoms';
import {AppDispatch} from '@/store/Store';
import {createNotification} from '@/store/slicers';
import {AxiosError} from 'axios';
import {useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {RoundedAvatarStyled} from '../../styles';
import {
  ToApproveActionStyled,
  ToApproveContainerStyled,
  ToApproveUserStyled,
} from './styles';

interface ToApproveProps extends ITicket {}

const ToApprove: React.FC<ToApproveProps> = ({_id, customer, service}) => {
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const {name, avatar} = customer;

  const onApprove = async () => {
    try {
      setApproving(true);

      await QueueService.approveTicket(_id);

      setApproving(false);
    } catch (error) {
      setApproving(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'approve_ticket',
              message: `errors.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  const onDeny = async () => {
    try {
      setRejecting(true);

      await QueueService.rejectTicket(_id);

      setRejecting(false);
    } catch (error) {
      setRejecting(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'reject_ticket',
              message: `errors.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  return (
    <ToApproveContainerStyled>
      <ToApproveUserStyled>
        <RoundedAvatarStyled source={{uri: avatar.url}} />
        <View>
          <Typography
            variant="body1"
            color="white3"
            translateProps={{
              name,
            }}>
            {'barber.onQueue.generic.askToJoin'}
          </Typography>
          <Typography variant="caption" translate={false} color="white1">
            {service.name}
          </Typography>
        </View>
      </ToApproveUserStyled>
      <ToApproveActionStyled>
        <Button
          title="buttons.deny"
          fillSpace
          colorScheme="danger"
          variant="ghost"
          onPress={onDeny}
          size="small"
          loading={rejecting}
          disabled={approving}
        />
        <Button
          title="buttons.approve"
          fillSpace
          colorScheme="success"
          onPress={onApprove}
          size="small"
          loading={approving}
          disabled={rejecting}
        />
      </ToApproveActionStyled>
    </ToApproveContainerStyled>
  );
};

export {ToApprove};
