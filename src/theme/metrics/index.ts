import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const metrics = {
  smPadding: 18,
  mdPadding: 24,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  smWidth: width < height ? width - 36 : height - 36,
  smHeight: width < height ? height - 36 : width - 36,
  mdHeight: width < height ? height - 48 : width - 48,
  mdWidth: width < height ? width - 48 : height - 48,
};

export function gtDeviceHeight(compareHeight: number) {
  return compareHeight > height;
}

export default metrics;
