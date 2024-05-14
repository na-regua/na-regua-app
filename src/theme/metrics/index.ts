import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const unit = 6;
const basePadding = 6;
const baseLineHeight = 1.4;

const metrics = {
  unitX1: unit * 1,
  unitX2: unit * 2,
  unitX3: unit * 3,
  unitX4: unit * 4,
  unitX5: unit * 5,
  unitX6: unit * 6,
  unitX7: unit * 7,
  unitX8: unit * 8,
  unitX9: unit * 9,
  unitX10: unit * 10,

  basePadding: basePadding,
  smPadding: basePadding * 3,
  mdPadding: basePadding * 4,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  xsWidth: width < height ? width - 24 : height - 24,
  xsHeight: width < height ? height - 24 : width - 24,
  smWidth: width < height ? width - 36 : height - 36,
  smHeight: width < height ? height - 36 : width - 36,
  mdHeight: width < height ? height - 48 : width - 48,
  mdWidth: width < height ? width - 48 : height - 48,

  lineHeight: baseLineHeight,
};

export function gtDeviceHeight(compareHeight: number) {
  return compareHeight > height;
}

export default metrics;
