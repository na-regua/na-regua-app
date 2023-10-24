import {Notify} from '@/components/atoms';
import {RootState} from '@/store/Store';
import {Metrics} from '@/theme';
import React from 'react';
import {ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

const StyledNotifyWrapper = styled.View`
  position: absolute;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-start;

  width: ${Metrics.screenWidth}px;
  padding: 18px;
  gap: 18px;
`;

interface INotifyProvider {}

const NotifyProvider: React.FC<INotifyProvider> = () => {
  const insets = useSafeAreaInsets();
  const insetBottomStyle: ViewStyle = {
    top: insets.top + 48,
  };

  const {notifications} = useSelector((state: RootState) => state.notify);

  return (
    <StyledNotifyWrapper style={insetBottomStyle}>
      {notifications.map((notify, index) => (
        <Notify {...notify} key={index} />
      ))}
    </StyledNotifyWrapper>
  );
};

export default NotifyProvider;
