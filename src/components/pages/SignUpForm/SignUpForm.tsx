import {BarbersService} from '@/app/api/services';
import {ICreateBarber, ICreateUser} from '@/app/models';
import {Button, Stepper} from '@/components/atoms';
import {AvatarStep, PicturesStep, ProfileStep} from '@/components/molecules';
import AddressStep, {
  IAdressFormData,
} from '@/components/molecules/AddressStep/AddressStep';
import {useKeyboardVisible} from '@/hooks';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {createNotification, setBarber, setUser} from '@/store/slicers';
import {assetToBuffer} from '@/utils';
import {AxiosError} from 'axios';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Asset} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {ContainerStyle, ScrollContent} from './styles';

const SignUpForm: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useAppNavigation();
  const isKeyboardVisible = useKeyboardVisible();
  const dispatch = useDispatch<AppDispatch>();

  const stepOneForm = useForm<ICreateUser>({
    mode: 'all',
  });

  const stepTwoForm = useForm<IAdressFormData>({
    mode: 'all',
  });

  const [avatar, setAvatar] = useState<Asset | undefined>();
  const [loading, setLoading] = useState(false);
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

  const signUp = async () => {
    if (avatar) {
      setLoading(true);

      const mappedThumbs = assetToBuffer([avatar, ...thumbs]);

      const {bairro, cep, complemento, localidade, logradouro, numero, uf} =
        stepTwoForm.getValues();

      const createBarber: ICreateBarber = {
        ...stepOneForm.getValues(),
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
          setLoading(false);
          dispatch(setBarber(data.barber));
          dispatch(setUser(data.user));

          navigation.navigate(APP_ROUTES.GENERIC_VERIFY_PHONE);
        }
      } catch (error) {
        setLoading(false);

        if (error instanceof AxiosError) {
          const {message} = error.response?.data;

          if (message) {
            dispatch(
              createNotification({
                id: 'sign-up-barber',
                type: 'error',
                message,
              }),
            );
          }
        }
      }
    }
  };

  return (
    <ContainerStyle>
      <ScrollContent>
        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep}>
          <ProfileStep
            goNext={handleNextStep}
            form={stepOneForm}
            completed={stepOneForm.formState.isValid}
          />
          <AddressStep
            form={stepTwoForm}
            completed={stepTwoForm.formState.isValid}
            canJumpTo={canNextObj[1]}
            goNext={handleNextStep}
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
      </ScrollContent>
      {!allCompleted && currentStep !== 4 && !isKeyboardVisible && (
        <Button
          disabled={!canNext}
          onPress={handleNextStep}
          title={t('barber.signUp.buttons.next')}
        />
      )}
      {(allCompleted || currentStep === 4) && !isKeyboardVisible && (
        <Button
          onPress={signUp}
          disabled={!allCompleted}
          loading={loading}
          title={t('barber.signUp.buttons.send')}
        />
      )}
    </ContainerStyle>
  );
};

export default SignUpForm;
