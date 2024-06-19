import {PartialRecord} from '@/app/models';
import {Box, IBoxProps, Icons, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {RootState} from '@/store/Store';
import {Metrics, TColorsType} from '@/theme';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {
  BackContainerStyle,
  BorderContainerStyle,
  LogoContainerStyle,
  LogoIconStyle,
  TitleContainerStyle,
  UserClickContainerStyled,
  UserImageStyle,
  WelcomeTextStyle,
} from './styles';

type THeaderClicables = 'user' | 'logo' | 'back';

interface IGenericHeaderProps {
  lightContent?: boolean;
  pressables?: PartialRecord<THeaderClicables, () => void>;
}

const User: React.FC<IGenericHeaderProps> = ({lightContent, pressables}) => {
  const {t} = useTranslation();
  const {user} = useSelector((state: RootState) => state.auth);
  const navigator = useAppNavigation();

  const mainColor = useMemo(
    () => (lightContent ? 'white3' : 'main'),
    [lightContent],
  );

  const navigateToNotifications = () => {
    navigator.navigate('/user/notifications');
  };

  return (
    <LogoContainerStyle>
      <UserClickContainerStyled
        disabled={!pressables?.user}
        onPress={pressables && pressables.user}>
        {user && user.avatar.url && (
          <>
            <UserImageStyle source={user.avatar.url} onError={() => {}} />
            <Typography variant="body1" color="black2" translate={false}>
              {t('generic.header.hello') + user.name.split(' ')[0]}
            </Typography>
          </>
        )}
      </UserClickContainerStyled>
      <Icons.BellIcon
        width={24}
        height={24}
        strokeWidth={2}
        color={mainColor}
        onPress={navigateToNotifications}
      />
    </LogoContainerStyle>
  );
};

const Actions: React.FC<IGenericHeaderProps> = ({lightContent, pressables}) => {
  const navigator = useAppNavigation();

  const mainColor = useMemo(
    () => (lightContent ? 'white3' : 'main'),
    [lightContent],
  );

  const navigateToNotifications = () => {
    navigator.navigate('/user/notifications');
  };

  return (
    <LogoContainerStyle>
      <LogoIconStyle
        onPress={pressables?.logo}
        activeOpacity={0.6}
        disabled={!pressables?.logo}>
        <Icons.LogoMiniIcon disabled width={32} height={32} />
      </LogoIconStyle>

      <Icons.BellIcon
        width={24}
        height={24}
        color={mainColor}
        strokeWidth={2}
        onPress={navigateToNotifications}
      />
    </LogoContainerStyle>
  );
};

const Welcome: React.FC<IGenericHeaderProps> = ({lightContent}) => {
  const {t} = useTranslation();
  const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);

  const color = useMemo(
    () => (lightContent ? 'white' : 'black'),
    [lightContent],
  );

  if (!user || !isAuthenticated) {
    return null;
  }

  return (
    <TitleContainerStyle>
      <WelcomeTextStyle
        variant="h3"
        color={`${color}3` as any}
        weight="regular">
        {t('generic.header.hello')}
      </WelcomeTextStyle>
      <WelcomeTextStyle variant="h3" weight="medium" color={`${color}3` as any}>
        {user.name.split(' ')[0]}
      </WelcomeTextStyle>
    </TitleContainerStyle>
  );
};

const GoBack: React.FC<
  {backText?: string; iconColor?: TColorsType} & IGenericHeaderProps
> = ({pressables, backText = 'nav.back', iconColor}) => {
  const {t} = useTranslation();

  return (
    <BackContainerStyle activeOpacity={0.6} onPress={pressables?.back}>
      <Icons.ChevronLeftIcon
        width={24}
        height={24}
        color={iconColor || 'primary'}
      />
    </BackContainerStyle>
  );
};

const Border: React.FC<IGenericHeaderProps> = () => {
  return <BorderContainerStyle />;
};

const Container: React.FC<IBoxProps> = ({children, ...rest}) => {
  const androidStyles: ViewStyle =
    Platform.OS === 'android' ? {paddingTop: 18} : {};

  return (
    <Box
      position="relative"
      paddings={{vertical: 12, horizontal: 18}}
      width={Metrics.screenWidth}
      {...rest}
      style={[rest.style, androidStyles]}>
      {children}
    </Box>
  );
};

export default {Actions, Border, Container, GoBack, User, Welcome};
