import {BarbersService} from '@/app/api/services';
import {ICreateBarber, ICreateUser} from '@/app/models';
import {Button, Stepper} from '@/components/atoms';
import {AvatarStep, PicturesStep, ProfileStep} from '@/components/molecules';
import AddressStep, {
  IAdressFormData,
} from '@/components/molecules/AddressStep/AddressStep';
import {useAppNavigation} from '@/navigation';
import {assetToBuffer} from '@/utils';
import {AxiosError} from 'axios';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Asset} from 'react-native-image-picker';

const SignUpForm: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();

  const stepOneForm = useForm<ICreateUser>({
    mode: 'all',
  });

  const stepTwoForm = useForm<IAdressFormData>({
    mode: 'all',
  });

  const [avatar, setAvatar] = useState<Asset | undefined>();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [thumbs, setThumbs] = useState<Asset[]>([]);

  const allCompleted = useMemo(
    () =>
      stepOneForm.formState.isValid &&
      stepTwoForm.formState.isValid &&
      !!avatar &&
      thumbs.length > 0,
    [
      stepOneForm.formState.isValid,
      stepTwoForm.formState.isValid,
      avatar,
      thumbs,
    ],
  );

  const canNextObj: Record<number, boolean> = {
    0: true,
    1: stepOneForm.formState.isValid,
    2: stepTwoForm.formState.isValid,
    3: !!thumbs && thumbs.length > 0,
    4: !!avatar && !!avatar.uri,
  };

  const canNext = useMemo(
    () => canNextObj[currentStep],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      currentStep,
      stepOneForm.formState.isValid,
      stepTwoForm.formState.isValid,
      thumbs,
      avatar,
    ],
  );

  const handleNextStep = () => {
    setCurrentStep(curr => curr + 1);
  };

  const handleOnAvatarChange = (file: Asset) => {
    setAvatar(file);
  };

  const handleOnFileUpload = (files: Asset[]) => {
    setThumbs(files);
  };

  const handleOnSubmit = async () => {
    if (avatar && avatar.base64) {
      const mappedThumbs = assetToBuffer([avatar, ...thumbs]);

      const {bairro, cep, complemento, localidade, logradouro, numero, uf} =
        stepTwoForm.getValues();

      const createBarber: ICreateBarber = {
        user: stepOneForm.getValues(),
        files: mappedThumbs,
        cep,
        neighborhood: bairro,
        city: localidade,
        uf: uf,
        street: logradouro,
        number: numero,
        complement: complemento,
      };

      try {
        const {data} = await BarbersService.signUpBarber(createBarber);

        if (data) {
          navigation.navigate('/generic/verify-phone');
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollWrapper}
        showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContent}>
          <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep}>
            <ProfileStep
              form={stepOneForm}
              completed={stepOneForm.formState.isValid}
            />
            <AddressStep
              form={stepTwoForm}
              completed={stepTwoForm.formState.isValid}
              canJumpTo={canNextObj[1]}
            />
            <PicturesStep
              thumbs={thumbs}
              onFileUpload={handleOnFileUpload}
              completed={thumbs && thumbs.length > 0}
              canJumpTo={canNextObj[2]}
            />
            <AvatarStep
              onAvatarChange={handleOnAvatarChange}
              completed={!!avatar && !!avatar.uri}
              canJumpTo={canNextObj[3]}
            />
          </Stepper>
        </View>
      </ScrollView>
      {!allCompleted && currentStep !== 4 && (
        <Button
          disabled={!canNext}
          onPress={handleNextStep}
          title={t('barber.signUp.buttons.next')}
        />
      )}
      {(allCompleted || currentStep === 4) && (
        <Button
          onPress={handleOnSubmit}
          disabled={!allCompleted}
          title={t('barber.signUp.buttons.send')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 18,
  },
  scrollWrapper: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 18,
  },
});

export default SignUpForm;
