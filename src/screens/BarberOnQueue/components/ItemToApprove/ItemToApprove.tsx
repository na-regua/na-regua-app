import React = require('react');
import {QueueService} from '@/app/api';
import {ITicket} from '@/app/models';
import {Button, Typography} from '@/components/atoms';
import {useState} from 'react';
import {View} from 'react-native';
import {RoundedAvatarStyled} from '../../styles';
import {
  ToApproveActionStyled,
  ToApproveContainerStyled,
  ToApproveUserStyled,
} from './styles';

interface ItemToApproveProps extends ITicket {}

const ItemToApprove: React.FC<ItemToApproveProps> = ({
  _id,
  customer,
  service,
}) => {
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const {name, avatar} = customer;

  const onApprove = async () => {
    try {
      setApproving(true);

      await QueueService.approveTicket(_id);

      setApproving(false);
    } catch (error) {
      setApproving(false);
    }
  };

  const onDeny = async () => {
    try {
      setRejecting(true);

      await QueueService.rejectTicket(_id);

      setRejecting(false);
    } catch (error) {
      setRejecting(false);
    }
  };

  return (
    <ToApproveContainerStyled>
      <ToApproveUserStyled>
        <RoundedAvatarStyled source={avatar.url} onError={() => {}} />
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

export {ItemToApprove};
