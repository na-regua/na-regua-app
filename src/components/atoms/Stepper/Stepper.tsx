import React, {PropsWithChildren, createContext} from 'react';
import {StyleSheet, View} from 'react-native';

interface IStepperProps extends PropsWithChildren {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

interface IStepperContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const StepperContext = createContext<IStepperContextProps>('' as any);

const Stepper: React.FC<IStepperProps> = ({
  children,
  currentStep,
  setCurrentStep,
}) => {
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
    flex: 1,
    flexDirection: 'column',
  },
});

export default Stepper;
