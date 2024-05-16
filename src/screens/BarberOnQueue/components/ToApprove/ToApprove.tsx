import React = require('react');
import {ITicket, SocketUrls} from '@/app/models';
import {Button, Typography} from '@/components/atoms';
import {RootState} from '@/store/Store';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RoundedAvatarStyled} from '../../styles';
import {
  ToApproveActionStyled,
  ToApproveContainerStyled,
  ToApproveUserStyled,
} from './styles';

interface ToApproveProps extends ITicket {}

const ToApprove: React.FC<ToApproveProps> = ({_id, customer, service}) => {
  const {socket} = useSelector((state: RootState) => state.socket);
  const {name, avatar} = customer;

  const onApprove = () => {
    if (socket) {
      socket.emit(SocketUrls.WorkerApproveCustomerRequest, {ticketId: _id});
    }
  };

  const onDeny = () => {
    if (socket) {
      socket.emit(SocketUrls.WorkerDenyCustomerRequest, {ticketId: _id});
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
        />
        <Button
          title="buttons.approve"
          fillSpace
          colorScheme="success"
          onPress={onApprove}
          size="small"
        />
      </ToApproveActionStyled>
    </ToApproveContainerStyled>
  );
};

export {ToApprove};
