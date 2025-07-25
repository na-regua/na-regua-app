import {Colors, Fonts, Metrics} from '@/theme';
import colors from '@/theme/colors';
import styled from 'styled-components/native';
import {Styles as DatePickerStyles} from 'react-native-ui-datepicker/lib/typescript/types';

const Container = styled.View`
  flex-direction: column;
  gap: ${Metrics.unitX3}px;
`;

const Field = styled.View`
  flex-direction: column;
  gap: ${Metrics.unitX1}px;
`;

const DatePicker = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Metrics.unitX2}px;
  border-radius: 8px;
  border: 1px solid ${colors.border};
`;

const ScheduleItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<{active?: boolean}>`
  align-items: center;
  justify-content: center;
  padding: ${Metrics.unitX2}px;
  border-radius: ${Metrics.unitX2}px;
  border: 1px solid ${colors.border};

  ${({active}) =>
    active &&
    `
    background-color: ${colors.main};
    border-color: ${colors.main};
  `}
`;

const ScheduleItemWrapper = styled.View`
  flex-direction: row;
  gap: ${Metrics.unitX2}px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const datePickerStyles: DatePickerStyles = {
  today: {
    borderRadius: 8,
  },
  today_label: {
    color: Colors.primary,
  },
  selected: {backgroundColor: colors.main, borderRadius: 8},
  selected_label: {
    fontFamily: Fonts.types.medium,
    color: Colors.white3,
  },
  day_label: {
    fontFamily: Fonts.types.regular,
  },
  weekday_label: {
    fontFamily: Fonts.types.medium,
    color: Colors.primary,
  },
  month_selector_label: {
    fontFamily: Fonts.types.medium,
    fontSize: 18,
    color: Colors.placeholder,
  },
  year_selector_label: {
    fontFamily: Fonts.types.medium,
    fontSize: 18,
    color: Colors.placeholder,
  },
  month_label: {
    fontFamily: Fonts.types.regular,
  },
  selected_month: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
};

export default {
  Container,
  Field,
  ScheduleItem,
  DatePicker,
  ScheduleItemWrapper,
};
