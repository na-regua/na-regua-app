import {Icons, Typography} from '@/components/atoms';
import {Colors, Fonts} from '@/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface IHeaderProps {
  authenticated?: boolean;
  showTitle?: boolean;
  title?: string;
  subtitle?: string;
}

const Header: React.FC<IHeaderProps> = ({
  authenticated = false,
  showTitle = true,
  title = 'Title',
  subtitle = 'Subtitle',
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContainerInfo}>
        <View style={styles.headerContainerInfoGroup}>
          <View style={styles.headerContainerInfoIcon} />
          <Typography variant="body2" color="black1">
            Na Régua
          </Typography>
        </View>
        <TouchableOpacity>
          <Icons.BellIcon width={24} height={24} color="main" />
        </TouchableOpacity>
      </View>
      {authenticated && (
        <View>
          <Typography variant="h2" color="black3">
            <Typography
              variant="h2"
              color="black3"
              customStyles={{fontWeight: Fonts.weights.regular}}>
              Olá,
            </Typography>{' '}
            Alex
          </Typography>
        </View>
      )}
      {!authenticated && showTitle && (
        <View style={styles.headerTitle}>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body2" color="black1">
            {subtitle}
          </Typography>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  headerContainerInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainerInfoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerContainerInfoIcon: {
    borderRadius: 8,
    width: 32,
    height: 32,
    backgroundColor: Colors.main,
  },
  headerContainerMessage: {},
  headerTitle: {
    flexDirection: 'column',
    gap: 4,
  },
});

export default Header;
