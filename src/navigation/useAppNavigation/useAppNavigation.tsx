import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export function useAppNavigation(): NativeStackNavigationProp<ParamListBase> {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return navigation;
}
