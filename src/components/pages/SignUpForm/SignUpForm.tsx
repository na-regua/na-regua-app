import {Button, Stepper} from '@/components/atoms';
import {AvatarStep, PicturesStep, ProfileStep} from '@/components/molecules';
import AddressStep, {
  IAdressFormData,
} from '@/components/molecules/AddressStep/AddressStep';
import {BarbersService} from '@/core/api/services';
import {ICreateBarber, ICreateUser} from '@/core/models';
import {AppDispatch} from '@/store/Store';
import {setBarber} from '@/store/slicers';
import {assetToBuffer} from '@/utils';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';

const SignUpForm: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
          dispatch(setBarber(data));
          navigation.navigate('GenericVerifyPhone');
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
            />
            <PicturesStep
              thumbs={thumbs}
              onFileUpload={handleOnFileUpload}
              completed={thumbs && thumbs.length > 0}
            />
            <AvatarStep
              onAvatarChange={handleOnAvatarChange}
              completed={!!avatar && !!avatar.uri}
            />
          </Stepper>
        </View>
      </ScrollView>
      {!allCompleted && currentStep !== 4 && (
        <Button
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
