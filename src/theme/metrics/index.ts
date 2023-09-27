import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const metrics = {
  basePadding: 18,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

export default metrics;
