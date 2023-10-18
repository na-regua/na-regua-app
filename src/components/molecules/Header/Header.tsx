import {Icons, Typography} from '@/components/atoms';
import {RootState} from '@/store/Store';
import {Fonts} from '@/theme';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

interface IHeaderProps {
  showTitle?: boolean;
  showBorder?: boolean;
  showWelcome?: boolean;
  title?: string;
  subtitle?: string;
  onIconPress?: () => void;
}

const Header: React.FC<IHeaderProps> = ({
  showTitle = true,
  showWelcome = false,
  showBorder = false,
  title = 'Title',
  subtitle = 'Subtitle',
  onIconPress,
}) => {
  const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <TouchableOpacity
          style={styles.containerInfoGroup}
          onPress={onIconPress}
          activeOpacity={0.8}>
          <View style={styles.containerInfoIcon} />
          <Typography variant="body2" color="black3">
            Na Régua
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icons.BellIcon width={24} height={24} color="main" />
        </TouchableOpacity>
      </View>
      {showTitle && (
        <View style={styles.title}>
          <Typography variant="h2" color="black3">
            {title}
          </Typography>
          <Typography variant="body1" color="black1">
            {subtitle}
          </Typography>
        </View>
      )}
      {showWelcome && isAuthenticated && user && (
        <View style={styles.title}>
          <Typography variant="h2" color="black3">
            <Typography
              variant="h2"
              color="black3"
              style={{fontWeight: Fonts.weights.regular}}>
              Olá,
            </Typography>{' '}
            {user.name}
          </Typography>
        </View>
      )}
      {showBorder && <View style={styles.border} />}
    </View>
  );
};

export default Header;
