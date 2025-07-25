import React, {PropsWithChildren, createContext, useState} from 'react';
import {StatusBarStyle} from 'react-native';

interface IStatusBarContext {
  isStatusBarVisible: boolean;
  statusBarStyle: StatusBarStyle;
  setStatusbarStyle: (value: StatusBarStyle) => void;
  setIsStatusBarVisible: (value: boolean) => void;
}

const StatusBarContext = createContext<IStatusBarContext>({
  isStatusBarVisible: true,
  statusBarStyle: 'default',
  setStatusbarStyle: () => {},
  setIsStatusBarVisible: () => {},
});

export const StatusBarProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [statusBarStyle, setStatusbarStyle] =
    useState<StatusBarStyle>('dark-content');

  const [isStatusBarVisible, setIsStatusBarVisible] = useState<boolean>(true);

  return (
    <StatusBarContext.Provider
      value={{
        isStatusBarVisible,
        statusBarStyle,
        setStatusbarStyle,
        setIsStatusBarVisible,
      }}>
      {children}
    </StatusBarContext.Provider>
  );
};

export default StatusBarContext;
