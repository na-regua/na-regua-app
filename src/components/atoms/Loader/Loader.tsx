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
  size = 'small',
}) => {
  const loaderSize = useMemo(() => {
    const androidSize = {
      small: 16,
      large: 26,
    };

    if (Platform.OS === 'ios') {
      return size;
    } else {
      return androidSize[size];
    }
  }, [size]);

  return (
    <View style={[loaderStyles.container, wrapperStyle]}>
      <ActivityIndicator size={loaderSize} color={color} />
    </View>
  );
};

export default Loader;
