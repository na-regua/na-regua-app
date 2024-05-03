import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const metrics = {
  unitX1: 6,
  unitX2: 12,
  unitX3: 18,
  unitX4: 24,
  unitX5: 30,
  unitX6: 36,
  unitX7: 42,
  unitX8: 48,

  basePadding: 6,
  smPadding: 18,
  mdPadding: 24,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  xsWidth: width < height ? width - 24 : height - 24,
  xsHeight: width < height ? height - 24 : width - 24,
  smWidth: width < height ? width - 36 : height - 36,
  smHeight: width < height ? height - 36 : width - 36,
  mdHeight: width < height ? height - 48 : width - 48,
  mdWidth: width < height ? width - 48 : height - 48,
};

export function gtDeviceHeight(compareHeight: number) {
  return compareHeight > height;
}

export default metrics;
