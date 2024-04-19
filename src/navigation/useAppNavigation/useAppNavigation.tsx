import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TRootStackParamList} from '../appRoutes';

export function useAppNavigation(): NativeStackNavigationProp<TRootStackParamList> {
  const navigation =
    useNavigation<NativeStackNavigationProp<TRootStackParamList>>();

  return navigation;
}
