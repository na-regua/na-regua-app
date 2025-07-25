import {AnimatedScrollView} from '@/components/atoms';
import {Colors, Metrics} from '@/theme';
import styled from 'styled-components/native';

export const FavoritesScrollStyled = styled(AnimatedScrollView).attrs({
  contentContainerStyle: {
    gap: Metrics.unitX3,
    width: '100%',
    flexGrow: 1,
  },
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;

export const FavoriteItemStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  border-radius: 12px;
  background: ${Colors.border};
  padding: 12px;
`;

export const SearchBarberButtonStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  border-radius: 12px;
  height: 44px;
  width: 100%;
  padding: 0 12px;
  border: 1px solid ${Colors.border};
  overflow: visible;
  align-items: flex-start;
  justify-content: center;
`;
