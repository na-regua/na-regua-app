import {StepperContext} from '@/components/molecules';
import {Colors} from '@/theme';
import React, {PropsWithChildren, useContext, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography from '../Typography/Typography';

export type TStepStatus = 'default' | 'active' | 'completed';

interface IStepProps extends PropsWithChildren {
  title: string;
  onPress?: () => void;
  number: number;
  completed?: boolean;
  showSpacer?: boolean;
}

const Step: React.FC<IStepProps> = ({
  title,
  number,
  onPress,
  completed,
  showSpacer = true,
  children,
}) => {
  const {currentStep, setCurrentStep} = useContext(StepperContext);

  const handleOnPress = () => {
    setCurrentStep(number);

    if (onPress) {
      onPress();
    }
  };

  const isActive = useMemo(() => currentStep === number, [currentStep, number]);
  const isCompleted = useMemo(() => completed, [completed]);

  const stepNumberStyle = useMemo(() => {
    if (isCompleted) {
      return [defaultStyles.stepNumber, completedStyles.stepNumber];
    }

    if (isActive) {
      return [defaultStyles.stepNumber, activeStyles.stepNumber];
    }

    return defaultStyles.stepNumber;
  }, [isActive, isCompleted]);

  const stepNumberTextStyle = useMemo(() => {
    if (isCompleted) {
      return completedStyles.stepNumberText;
    }

    if (isActive) {
      return activeStyles.stepNumberText;
    }

    return defaultStyles.stepNumberText;
  }, [isActive, isCompleted]);

  const stepTitleStyle = useMemo(() => {
    if (isCompleted) {
      return completedStyles.stepTitle;
    }

    if (isActive) {
      return activeStyles.stepTitle;
    }

    return defaultStyles.stepTitle;
  }, [isActive, isCompleted]);

  const stepSpacerStyle = useMemo(() => {
    if (isCompleted) {
      return completedStyles.stepSpacer;
    }

    if (isActive) {
      return activeStyles.stepSpacer;
    }

    return defaultStyles.stepSpacer;
  }, [isActive, isCompleted]);

  const stepContentWrapperStyle = useMemo(() => {
    if (!isActive) {
      return [activeStyles.stepContentWrapper, defaultStyles.stepContentHide];
    }

    return activeStyles.stepContentWrapper;
  }, [isActive]);

  return (
    <View style={defaultStyles.stepWrapper}>
      <TouchableOpacity
        onPress={handleOnPress}
        style={defaultStyles.step}
        activeOpacity={0.6}>
        <View style={stepNumberStyle}>
          <View>
            <Typography customStyles={stepNumberTextStyle} variant="button">
              {number}
            </Typography>
          </View>
        </View>
        <Typography variant="body1" customStyles={stepTitleStyle}>
          {title}
        </Typography>
      </TouchableOpacity>
      {showSpacer && !isActive && <View style={stepSpacerStyle} />}

      <View style={stepContentWrapperStyle}>
        <View style={stepSpacerStyle} />
        <View style={activeStyles.stepContent}>{children}</View>
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  stepWrapper: {
    flexDirection: 'column',
    gap: 4,
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
});

const activeStyles = StyleSheet.create({
  stepTitle: {
    color: Colors.main,
  },
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
    paddingVertical: 12,
  },
  stepContentWrapper: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
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

const completedStyles = StyleSheet.create({
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
    width: 1,
    height: 25,
    marginHorizontal: 12,
    backgroundColor: Colors.main,
  },
});

export default Step;
