import React, {PropsWithChildren, useContext, useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {StepperContext} from '../Stepper/Stepper';
import Typography from '../Typography/Typography';
import {
  activeStyles,
  defaultStyles,
  stepContentWrapperStyle,
  stepDescriptionStyle,
  stepNumberStyle,
  stepNumberTextStyle,
  stepSpacerStyle,
  stepTitleStyle,
} from './styles';

export type TStepStatus = 'default' | 'active' | 'completed';

interface IStepProps extends PropsWithChildren {
  title: string;
  description?: string;
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
  description,
}) => {
  const {currentStep, setCurrentStep} = useContext(StepperContext);

  const handleOnPress = () => {
    if (currentStep !== number) {
      setCurrentStep(number);
    } else {
      setCurrentStep(0);
    }

    if (onPress) {
      onPress();
    }
  };

  const isActive = useMemo(() => currentStep === number, [currentStep, number]);
  const isCompleted = useMemo(() => completed, [completed]);

  const status: TStepStatus = useMemo(() => {
    if (isCompleted) {
      return 'completed';
    }
    if (isActive) {
      return 'active';
    }
    return 'default';
  }, [isActive, isCompleted]);

  return (
    <View style={defaultStyles.stepWrapper}>
      <TouchableOpacity
        onPress={handleOnPress}
        style={defaultStyles.step}
        activeOpacity={0.6}>
        <View style={stepNumberStyle[status]}>
          <View>
            <Typography
              customStyles={stepNumberTextStyle[status]}
              variant="button">
              {number}
            </Typography>
          </View>
        </View>
        <Typography variant="body1" customStyles={stepTitleStyle[status]}>
          {title}
        </Typography>
      </TouchableOpacity>

      {showSpacer && !isActive && <View style={stepSpacerStyle[status]} />}

      <View style={stepContentWrapperStyle[isActive ? 'active' : 'default']}>
        <View style={stepSpacerStyle[status]} />
        <View style={activeStyles.stepContent}>
          {description && isActive && (
            <View style={defaultStyles.stepDescriptionWrapper}>
              <Typography
                variant="caption"
                customStyles={stepDescriptionStyle[status]}>
                {description}
              </Typography>
            </View>
          )}
          {children}
        </View>
      </View>
    </View>
  );
};

export default Step;
