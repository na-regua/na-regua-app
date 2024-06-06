import {FlatList} from 'react-native';
import styled from 'styled-components/native';

export const LoaderWrapperStyled = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  align-self: stretch;
`;

export const FlatListStyled = styled(FlatList).attrs({
  contentContainerStyle: {
    gap: 18,
    flexGrow: 1,
    flex: 1,
  },
})`
  flex: 1;
  align-self: stretch;
`;
