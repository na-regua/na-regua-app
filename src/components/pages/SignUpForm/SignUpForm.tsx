import {BarbersService} from '@/app/api/services';
import {IAdressFormData, ICreateBarber, ICreateUser} from '@/app/models';
import {AvoidKeyboard, Button, Stepper, Typography} from '@/components/atoms';
import {AvatarStep, PicturesStep, ProfileStep} from '@/components/molecules';
import AddressStep from '@/components/molecules/AddressStep/AddressStep';
import {useAppNavigation} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {
  createNotification,
  setBarber,
  setPersistedToken,
  setUser,
} from '@/store/slicers';
import {assetToBuffer} from '@/utils';
import {CacheManager} from '@georstat/react-native-image-cache';
import {AxiosError} from 'axios';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {ContainerStyle, ContentHeaderStyle, ScrollContent} from './styles';

const SignUpForm: React.FC = () => {
  const {t} = useTranslation();
  const navigator = useAppNavigation();
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

  const onNextStep = () => {
    setCurrentStep(curr => {
      if (curr + 1 > 2) {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      }

      return curr + 1;
    });
  };

  const onAvatarChange = (file: Asset) => {
    setAvatar(file);
  };

  const onThumbUpload = (files: Asset[]) => {
    setThumbs(files);
  };

  const signUp = async () => {
    if (avatar) {
      setLoading(true);

      const mappedThumbs = assetToBuffer([avatar, ...thumbs]);

      const {bairro, cep, complemento, localidade, logradouro, numero, uf} =
        stepTwoForm.getValues();

      const {email, name, password, phone} = stepOneForm.getValues();

      const unmaskedPhone = phone.replace(/\D/g, '');

      const createBarber: ICreateBarber = {
        email,
        name,
        password,
        phone: unmaskedPhone,
        files: mappedThumbs,
        address: {
          cep,
          neighborhood: bairro,
          city: localidade,
          uf: uf,
          street: logradouro,
          number: +numero,
          complement: complemento,
        },
      };

      try {
        const {data} = await BarbersService.signUpBarber(createBarber);

        if (data) {
          await dispatch(setPersistedToken(data.accessToken));

          if (data.user.avatar.url) {
            CacheManager.prefetch(data.user.avatar.url);
          }

          if (data.barber.avatar.url) {
            CacheManager.prefetch(data.barber.avatar.url);
          }

          dispatch(setBarber(data.barber));
          dispatch(setUser(data.user));

          setTimeout(() => {
            setLoading(false);

            navigator.navigate('/barber/settings/workers', {
              showContinue: true,
            });
          });
        }

        if (!data) {
          setLoading(false);
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
                message: `errors.${message}`,
              }),
            );
          }
        }
      }
    }
  };

  return (
    <ContainerStyle>
      <AvoidKeyboard>
        <ScrollContent>
          <ContentHeaderStyle>
            <Typography variant="h2" color="black3">
              {t('barber.signUp.title')}
            </Typography>
            <Typography variant="body2" color="black1">
              {t('barber.signUp.subtitle')}
            </Typography>
          </ContentHeaderStyle>

          <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep}>
            <ProfileStep
              goNext={onNextStep}
              form={stepOneForm}
              completed={stepOneForm.formState.isValid}
            />
            <AddressStep
              form={stepTwoForm}
              completed={stepTwoForm.formState.isValid}
              canJumpTo={canNextObj[1]}
              goNext={onNextStep}
            />
            <PicturesStep
              onFileUpload={onThumbUpload}
              completed={thumbs && thumbs.length > 0}
              canJumpTo={canNextObj[2]}
            />
            <AvatarStep
              onAvatarChange={onAvatarChange}
              completed={!!avatar && !!avatar.uri}
              canJumpTo={canNextObj[3]}
            />
          </Stepper>
        </ScrollContent>
        {!allCompleted && currentStep !== 4 && canNextObj[currentStep] && (
          <Button
            disabled={!canNext}
            onPress={onNextStep}
            title={t('barber.signUp.buttons.next')}
          />
        )}
        {(allCompleted || currentStep === 4) && (
          <Button
            onPress={signUp}
            disabled={!allCompleted}
            loading={loading}
            title={t('barber.signUp.buttons.send')}
          />
        )}
      </AvoidKeyboard>
    </ContainerStyle>
  );
};

export default SignUpForm;
