import {Icons, Typography} from '@/components/atoms';
import {RootState} from '@/store/Store';
import React, {useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ContainerInfoStyle, ContainerStyle, styles} from './styles';

interface IHeaderProps {
  showTitle?: boolean;
  showBorder?: boolean;
  showWelcome?: boolean;
  title?: string;
  subtitle?: string;
  clickable?: boolean;
  onIconPress?: () => void;
  lightContent?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  showTitle = true,
  showWelcome = false,
  showBorder = false,
  clickable = false,
  title = 'Title',
  subtitle = 'Subtitle',
  lightContent,
  onIconPress,
}) => {
  const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);

  const color = useMemo(
    () => (lightContent ? 'white' : 'black'),
    [lightContent],
  );

  const mainColor = useMemo(
    () => (lightContent ? 'white3' : 'main'),
    [lightContent],
  );

  return (
    <ContainerStyle>
      <View style={styles.containerInfo}>
        <TouchableOpacity
          style={styles.containerInfoGroup}
          onPress={onIconPress}
          activeOpacity={0.8}
          disabled={!clickable}>
          <ContainerInfoStyle lightContent={lightContent}></ContainerInfoStyle>
          <Typography variant="body2" color={`${color}3` as any}>
            Na Régua
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Icons.BellIcon
            width={24}
            height={24}
            color={`${mainColor}` as any}
          />
        </TouchableOpacity>
      </View>
      {showTitle && (
        <View style={styles.title}>
          <Typography variant="h3" color={`${color}3` as any}>
            {title}
          </Typography>
          <Typography variant="body1" color={`${color}1` as any}>
            {subtitle}
          </Typography>
        </View>
      )}
      {showWelcome && isAuthenticated && user && (
        <View style={styles.title}>
          <Typography
            variant="h3"
            style={styles.welcomeText}
            color={`${color}3` as any}>
            Olá, {user.name}
          </Typography>
        </View>
      )}
      {showBorder && <View style={styles.border} />}
    </ContainerStyle>
  );
};

export default Header;
