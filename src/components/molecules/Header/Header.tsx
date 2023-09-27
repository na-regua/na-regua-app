import {Icons, Typography} from '@/components/atoms';
import {Colors, Fonts} from '@/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface IHeaderProps {
  showWelcome?: boolean;
}

const Header: React.FC<IHeaderProps> = ({showWelcome = false}) => {
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
          <Icons.Bell width={24} height={24} color="main" />
        </TouchableOpacity>
      </View>
      {showWelcome && (
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
});

export default Header;
