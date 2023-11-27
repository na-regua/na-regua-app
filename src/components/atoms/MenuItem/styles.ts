import {Colors} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const menuItemStyles = StyleSheet.create({
  container: {},
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
});

export const ContainerStyle = styled.TouchableOpacity<{pressed?: boolean}>`
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
  gap: 8px;
  background-color: ${Colors.border};

  ${({pressed}) =>
    pressed &&
    `
    background-color: ${Colors.borderHover};
  `}

  ${({disabled}) =>
    disabled &&
    `
    background-color: ${Colors.disabled};
  `}
`;

export const IconWrapperStyle = styled.View`
  width: 42px;
  height: 42px;
  border-radius: ${42 / 2}px;
  background-color: ${Colors.default};
  align-items: center;
  justify-content: center;
`;
