import React from 'react';
import {ActivityIndicator, Platform, View, ViewStyle} from 'react-native';
import {loaderStyles} from './styles';

interface ILoaderProps {
  color: string;
  wrapperStyle?: ViewStyle;
}

const Loader: React.FC<ILoaderProps> = ({color, wrapperStyle}) => {
  const size = Platform.OS === 'ios' ? 'small' : 64;

  return (
    <View style={[loaderStyles.container, wrapperStyle]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;
