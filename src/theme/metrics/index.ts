import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const metrics = {
  smPadding: 18,
  mdPadding: 24,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  appUsableWidth: width < height ? width - 36 : height - 36,
  appUsableHeight: width < height ? height - 36 : width - 36,
};

export default metrics;
