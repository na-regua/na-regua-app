import {AvoidKeyboard, Box, Button, Input} from '@/components/atoms';

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

export const PageCardGroupStyled = styled(Box)``;

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
