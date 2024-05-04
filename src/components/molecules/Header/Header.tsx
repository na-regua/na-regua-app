import {Icons, Typography} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {RootState} from '@/store/Store';
import {Fonts} from '@/theme';
import {TColorsType} from '@/theme/colors';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {
  BackContainerStyle,
  BorderContainerStyle,
  ContainerStyle,
  LogoContainerStyle,
  LogoIconStyle,
  TitleContainerStyle,
  WelcomeTextStyle,
} from './styles';

interface IHeaderProps {
  showTitle?: boolean;
  showBack?: boolean;
  showWelcome?: boolean;
  showBorder?: boolean;
  showActions?: boolean;

  title?: string;
  subtitle?: string;
  backText?: string;
  iconClickable?: boolean;
  onIconPress?: () => void;
  onBackPress?: () => void;
  lightContent?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  showTitle = false,
  showBack = false,
  backText = 'nav.back',
  showActions = true,
  showWelcome = false,
  showBorder = false,
  title = 'Title',
  subtitle = 'Subtitle',
  lightContent,
  iconClickable = false,
  onIconPress,
  onBackPress,
}) => {
  const {t} = useTranslation();
  const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);
  const navigator = useAppNavigation();

  const color = useMemo(
    () => (lightContent ? 'white' : 'black'),
    [lightContent],
  );

  const mainColor = useMemo(
    () => (lightContent ? 'white3' : 'main'),
    [lightContent],
  );

  const navigateToNotifications = () => {
    navigator.navigate('/user/notifications');
  };

  return (
    <ContainerStyle>
      {showActions && (
        <LogoContainerStyle>
          <LogoIconStyle
            onPress={onIconPress}
            activeOpacity={0.6}
            disabled={!iconClickable}>
            <Icons.LogoMiniIcon disabled width={32} height={32} />
          </LogoIconStyle>

          <Icons.BellIcon
            width={24}
            height={24}
            color={mainColor}
            onPress={navigateToNotifications}
          />
        </LogoContainerStyle>
      )}

      {showTitle && (
        <TitleContainerStyle>
          <Typography variant="h3" color={color as TColorsType}>
            {t(title)}
          </Typography>
          <Typography variant="body1" color={color as TColorsType}>
            {t(subtitle)}
          </Typography>
        </TitleContainerStyle>
      )}

      {showWelcome && isAuthenticated && user && (
        <TitleContainerStyle>
          <WelcomeTextStyle
            variant="h3"
            color={`${color}3` as any}
            style={{
              fontWeight: Fonts.weights.regular,
            }}>
            Olá,{' '}
          </WelcomeTextStyle>
          <WelcomeTextStyle variant="h3" color={`${color}3` as any}>
            {user.name}
          </WelcomeTextStyle>
        </TitleContainerStyle>
      )}

      {showBack && (
        <BackContainerStyle activeOpacity={0.6} onPress={onBackPress}>
          <Icons.LeftIcon width={16} height={16} color="primary" />
          <Typography variant="body1" color="primary">
            {t(backText)}
          </Typography>
        </BackContainerStyle>
      )}

      {showBorder && <BorderContainerStyle />}
    </ContainerStyle>
  );
};

export default Header;
