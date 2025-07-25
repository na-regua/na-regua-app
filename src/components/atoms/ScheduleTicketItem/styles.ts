import {Colors, Metrics} from '@/theme';
import {CachedImage} from '@georstat/react-native-image-cache';
import styled from 'styled-components/native';

const ScheduleItem = styled.View`
  width: 100%;
  align-self: stretch;
  background: ${Colors.white3};
  padding: ${Metrics.unit(2)}px;
  border-radius: ${Metrics.unit(3)}px;

  flex-direction: column;
`;

const ScheduleItemRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;
const ScheduleAvatar = styled(CachedImage).attrs({
  imageStyle: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
})`
  width: 48px;
  height: 48px;
`;

export default {
  ScheduleItem,
  ScheduleItemRow,
  ScheduleAvatar,
};
