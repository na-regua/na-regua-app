import {AvoidKeyboard, Button, Input} from '@/components/atoms';
import {Colors} from '@/theme';
import {TouchableHighlight, TouchableWithoutFeedback, View} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedView = Animated.createAnimatedComponent(View);

export const CutContainerStyled = styled(AnimatedView)`
  flex: 1;
  background: ${Colors.border};
`;

export const CutContentStyled = styled.View`
  flex: 1;
`;

export const SplashWrapperStyled = styled(AnimatedView)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const PageCardTitleStyled = styled.View`
  gap: 2px;
`;

export const WithoutFeedbackStyled = styled(TouchableWithoutFeedback)`
  flex: 1;
  align-content: stretch;
`;

export const PageCardRowStyled = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  gap: 18px;
  position: relative;
  z-index: 2;
`;

export const CodeInputStyled = styled(Input).attrs({
  wrapperStyle: {
    flex: 1,
  },
})``;

export const SearchButtonStyled = styled(Button).attrs({
  variant: 'ghost',
  colorScheme: 'primary',
})`
  width: 44px;
  height: 44px;
`;

export const LineStyled = styled.View`
  width: 100%;
  background-color: ${Colors.border};
  height: 1px;
`;

export const ShareQrButtonContentStyled = styled.View`
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SectionStyled = styled.View`
  gap: 12px;
`;

export const SectionTitleStyled = styled.View`
  gap: 2px;
`;

export const HorizontalScrollStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    gap: 18,
  },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const BarberItemStyled = styled.TouchableHighlight.attrs({
  underlayColor: Colors.borderHover,
})`
  padding: 12px;
  border-radius: 12px;
  border-radius: 8px;
  background-color: ${Colors.border};
  gap: 12px;
  flex-direction: row;
  align-items: flex-start;
  min-width: 260px;
`;

export const BarberImageStyled = styled.Image.attrs({resizeMode: 'cover'})`
  width: 60px;
  height: 60px;
  border-radius: 6px;
`;

export const BarberInfoStyled = styled.View`
  gap: 2px;
  justify-content: space-between;
`;

export const BarberItemTitleStyled = styled.View``;

export const BarberItemLocationStyled = styled.View``;

import {hexPercentage} from '@/theme/colors';
import {ViewStyle} from 'react-native';

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
export const AttendanceBarberItemImageStyled = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  margin: 6px 0;
`;

export const AttendanceSectionStyled = styled.View`
  gap: 12px;
`;

export const AttendanceSectionContentStyled = styled.View`
  gap: 18px;
`;

export const AttendanceItemStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
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
    border-color: ${Colors.main};
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
`;

export const OtherButtonContentStyled = styled.View`
  gap: 10px;
  flex-direction: row;
  align-items: center;
`;

export const AvoidKeyboardStyled = styled(AvoidKeyboard)`
  gap: 18px;
`;

export const DropdownWrapperStyled = styled(AnimatedView)<{gap?: number}>`
  position: absolute;
  left: 0;
  top: 52px;
  width: 100%;
  background: ${Colors.bgLight};
  border-radius: 12px;
`;

export const menuShadow = {
  // Ios
  shadowColor: Colors.black3,
  shadowOffset: {
    height: 6,
    width: 0,
  },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  // Android
  elevation: 3,
};

export const DropdownMenuStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'column',
  },
})`
  background: white;
  border-radius: 12px;
  max-height: 200px;
  z-index: 3;
  overflow: hidden;
`;

export const DropdownItemStyled = styled(TouchableHighlight).attrs({
  underlayColor: Colors.borderHover,
})<{first?: boolean; last?: boolean}>`
  gap: 12px;
  padding: 12px;

  ${({first}) =>
    !first && `border-top-width: 1px; border-top-color: ${Colors.border}`}
`;

export const DropdownItemContentStyled = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const DropdownItemInfoStyled = styled.View``;

export const DropdownItemImageStyled = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 42px;
  height: 42px;
  border-radius: 6px;
`;
