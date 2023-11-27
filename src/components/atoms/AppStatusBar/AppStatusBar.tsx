import {StatusBarContext} from '@/providers';
import {Colors} from '@/theme';
import React, {useContext} from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';

interface IAppStatusBar {
  color?: string;
  barStyle?: StatusBarStyle;
}

const AppStatusBar: React.FC<IAppStatusBar> = ({
  color = Colors.bgLight,
  barStyle,
}) => {
  const {statusBarStyle, isStatusBarVisible} = useContext(StatusBarContext);

  return (
    isStatusBarVisible && (
      <StatusBar
        barStyle={barStyle || statusBarStyle}
        backgroundColor={color}
      />
    )
  );
};

export default AppStatusBar;
