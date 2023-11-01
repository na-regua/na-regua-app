import React, {useMemo} from 'react';
import {ActivityIndicator, Platform, View, ViewStyle} from 'react-native';
import {loaderStyles} from './styles';

interface ILoaderProps {
  color: string;
  wrapperStyle?: ViewStyle;
  size?: 'small' | 'large';
}

const Loader: React.FC<ILoaderProps> = ({
  color,
  wrapperStyle,
  size = Platform.OS === 'ios' ? 'small' : 64,
}) => {
  const loaderSize = useMemo(() => {
    if (Platform.OS === 'ios') {
      return size;
    } else {
      return size === 'small' ? 64 : 128;
    }
  }, [size]);

  return (
    <View style={[loaderStyles.container, wrapperStyle]}>
      <ActivityIndicator size={loaderSize} color={color} />
    </View>
  );
};

export default Loader;
