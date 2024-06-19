import {Colors} from '@/theme';
import {hexPercentage} from '@/theme/colors';
import {CachedImage} from '@georstat/react-native-image-cache';
import {View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedView = Animated.createAnimatedComponent(View);

export const AttendanceContentStyled = styled(AnimatedView)`
  gap: 18px;
`;

export const AttendanceBarberItemStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

export const AttendanceBarberInfoStyled = styled.View`
  gap: 12px;
`;

export const AttendanceBarberInfoItemStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

export const AttendanceBarberItemTitleStyled = styled.View`
  gap: 2px;
`;

export const AttendanceBarberItemImageStyled = styled(CachedImage).attrs({
  resizeMode: 'cover',
  imageStyle: {
    borderRadius: 6,
  },
})`
  width: 48px;
  height: 48px;
  margin: 6px 0;
`;

export const AttendanceSectionStyled = styled.View`
  gap: 12px;
`;

export const AttendanceIsCustomerStyled = styled.View`
  flex-direction: row;
  gap: 6px;
  background-color: ${Colors.primary};
  border-radius: 12px;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;

export const AttendanceSectionContentStyled = styled.View`
  gap: 18px;
`;

export const AttendanceItemStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<{
  justifyContent?: ViewStyle['justifyContent'];
  active?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({justifyContent}) => justifyContent || 'flex-start'};
  padding: 12px;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${Colors.border};
  background: ${Colors.border}${hexPercentage[10]};

  ${({active}) =>
    active &&
    `
    background: ${Colors.main}${hexPercentage[10]};
    border: 1px solid ${Colors.main};
  `}
`;

export const AttendanceItemIconStyled = styled.View``;
export const AttendanceItemGroupStyled = styled.View`
  flex-direction: row;
  gap: 12px;
`;
export const AttendanceItemSuffixStyled = styled.View``;

export const PageCardFooterStyled = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 18px;
`;

export const OtherButtonContentStyled = styled.View`
  gap: 10px;
  flex-direction: row;
  align-items: center;
`;
