import React, {PropsWithChildren, createContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';

interface IStepperProps extends PropsWithChildren {
  initialStep: number;
}

interface IStepperContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const StepperContext = createContext<IStepperContextProps>('' as any);

const Stepper: React.FC<IStepperProps> = ({children, initialStep}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  return (
    <View style={styles.stepperWrapper}>
      <StepperContext.Provider value={{currentStep, setCurrentStep}}>
        <View style={styles.stepperContainer}>{children}</View>
      </StepperContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  stepperWrapper: {
    flex: 1,
  },
  stepperContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
});

export default Stepper;
