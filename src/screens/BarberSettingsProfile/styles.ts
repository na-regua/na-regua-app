import {Colors, Metrics} from '@/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    gap: Metrics.smPadding,
  },
  keyboardAvoidingView: {
    flex: 1,
    gap: Metrics.smPadding,
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  formRowField: {
    flex: 1,
  },
  formRowFieldHalf: {
    flex: 0.3,
  },
});

export const ContainerStyle = styled.View`
  flex: 1;
  background-color: ${Colors.bgLight};
`;

export const ScrollContentStyle = styled.ScrollView`
  flex: 1;
`;

export const ContentBackLinkStyle = styled.TouchableOpacity`
  gap: 2px;
  flex-direction: row;
  align-items: center;
`;

export const ContentHeaderStyle = styled.View`
  gap: 4px;
`;

export const CardGroupStyle = styled.View`
  gap: 12px;
`;

export const ContentStyle = styled.View`
  flex: 1;
  padding: ${Metrics.smPadding}px;
  gap: ${Metrics.smPadding}px;
  flex-direction: column;
`;

export const CardStyle = styled.View`
  border: 1px solid ${Colors.border};
  border-radius: 8px;

  padding: 12px;
  gap: 18px;
`;

export const FormRow = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 18px;
`;
