import styled from 'styled-components/native';
import {AnimatedTouchableOpacity} from '../AnimatedComponents';

export const IconTouchableViewStyle = styled(AnimatedTouchableOpacity).attrs({
  activeOpacity: 0.6,
})`
  align-items: center;
  justify-content: center;
`;
