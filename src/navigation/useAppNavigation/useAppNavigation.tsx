import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TRootStackParamList} from '../appRoutes';

export function useAppNavigation(): NativeStackNavigationProp<ParamListBase> {
  const navigation =
    useNavigation<NativeStackNavigationProp<TRootStackParamList>>();

  return navigation;
}
