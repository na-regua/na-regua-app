import {Colors} from '@/theme';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {TStepStatus} from './Step';

export const defaultStyles = StyleSheet.create({
  stepWrapper: {
    flexDirection: 'column',
    gap: 2,
  },
  step: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  stepNumber: {
    width: 25,
    height: 25,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.default,
  },
  stepNumberText: {
    textAlign: 'center',
    color: Colors.default,
  },
  stepTitle: {
    color: Colors.default,
  },
  stepSpacer: {
    width: 1,
    height: 25,
    marginHorizontal: 12,
    backgroundColor: Colors.border,
  },
  stepContentHide: {
    display: 'none',
  },
  stepDescriptionWrapper: {},
});

export const activeStyles = StyleSheet.create({
  stepTitle: {
    color: Colors.main,
  },
  stepDescription: {},
  stepNumber: {
    borderColor: Colors.main,
  },
  stepNumberText: {
    textAlign: 'center',
    color: Colors.main,
  },
  stepContent: {
    flexDirection: 'column',
    gap: 12,
    flex: 1,
    paddingBottom: 12,
  },
  stepContentWrapper: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginVertical: 4,
  },
  stepSpacer: {
    width: 1,
    maxWidth: 1,
    flex: 1,
    minHeight: 25,
    marginHorizontal: 12,
    backgroundColor: Colors.main,
  },
});

export const completedStyles = StyleSheet.create({
  stepTitle: {
    color: Colors.black3,
  },
  stepNumber: {
    textAlign: 'center',
    backgroundColor: Colors.main,
    borderWidth: 0,
  },
  stepNumberText: {
    textAlign: 'center',
    color: Colors.white3,
  },
  stepSpacer: {
    flex: 1,
    minHeight: 25,
    maxWidth: 1,
    marginHorizontal: 12,
    backgroundColor: Colors.main,
  },
  stepDescription: {
    color: Colors.black2,
  },
});

export const stepNumberStyle: Record<TStepStatus, TextStyle | TextStyle[]> = {
  completed: [defaultStyles.stepNumber, completedStyles.stepNumber],
  active: [defaultStyles.stepNumber, activeStyles.stepNumber],
  default: defaultStyles.stepNumber,
};

export const stepNumberTextStyle: Record<TStepStatus, TextStyle> = {
  completed: completedStyles.stepNumberText,
  active: activeStyles.stepNumberText,
  default: defaultStyles.stepNumberText,
};

export const stepTitleStyle: Record<TStepStatus, TextStyle> = {
  completed: completedStyles.stepTitle,
  active: activeStyles.stepTitle,
  default: defaultStyles.stepTitle,
};

export const stepDescriptionStyle: Record<TStepStatus, TextStyle> = {
  completed: completedStyles.stepDescription,
  active: activeStyles.stepTitle,
  default: defaultStyles.stepTitle,
};

export const stepContentWrapperStyle: Record<string, ViewStyle> = {
  active: activeStyles.stepContentWrapper,
  default: defaultStyles.stepContentHide,
};

export const stepSpacerStyle: Record<TStepStatus, ViewStyle> = {
  completed: completedStyles.stepSpacer,
  active: activeStyles.stepSpacer,
  default: defaultStyles.stepSpacer,
};
