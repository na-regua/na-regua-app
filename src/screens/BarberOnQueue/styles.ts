import {Button} from '@/components/atoms';
import {BOTTOM_NAV_HEIGHT} from '@/navigation/BottomNav/styles';
import {Colors, Metrics} from '@/theme';
import {CachedImage} from '@georstat/react-native-image-cache';
import {EdgeInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const OnQueueContainerStyled = styled.View<{
  insets: EdgeInsets;
}>`
  flex: 1;
  background: ${Colors.bgLight};

  ${({insets}) =>
    `
    padding-top: ${insets.top}px;
    padding-bottom: ${insets.bottom}px;
    padding-left: ${insets.left}px;
    padding-right: ${insets.right}px;
  `}
`;

export const OnQueueContentStyled = styled.View<{fs: boolean}>`
  flex: 1;
  gap: 18px;
  padding: 18px;

  ${({fs}) =>
    !fs &&
    `
    margin-bottom: ${BOTTOM_NAV_HEIGHT}px;
  `}
`;

export const OnQueueActionsStyled = styled.View`
  gap: ${Metrics.unitX3}px;
`;

export const OnQueueButtonStyled = styled(Button)`
  flex: 1;
`;
export const OnQueueActionsRowStyled = styled.View`
  gap: ${Metrics.unitX3}px;
  flex-direction: row;
  align-items: center;
`;

export const OnQueueScrollStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    gap: 18,
  },
})`
  flex: 1;
`;

export const OnQueueLoaderWrapperStyled = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const RoundedAvatarStyled = styled(CachedImage).attrs({
  resizeMode: 'cover',
  imageStyle: {
    borderRadius: 21,
  },
})`
  width: 42px;
  height: 42px;
`;
