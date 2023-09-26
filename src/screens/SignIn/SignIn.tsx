import Colors from '@theme/colors';
import React from 'react';
import {StatusBar, StyleSheet, View, useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Typography} from 'src/components/atoms';

const SignIn: React.FC = () => {
  const insets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={[styles.container, insetsStyles]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.main}
      />
      <Typography variant="body1">teste</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgLight,
  },
});

export default SignIn;
