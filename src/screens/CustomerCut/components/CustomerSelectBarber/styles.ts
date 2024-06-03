import {AnimatedScrollView} from '@/components/atoms';
import {Colors} from '@/theme';
import styled from 'styled-components/native';

export const FavoritesScrollStyled = styled(AnimatedScrollView).attrs({
  contentContainerStyle: {
    gap: 12,
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
