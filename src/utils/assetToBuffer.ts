import {IBuffer} from '@/app/models';
import {Platform} from 'react-native';
import {Asset} from 'react-native-image-picker';

export function assetToBuffer(assets: Asset[]): IBuffer[] {
  const buffers: IBuffer[] = [];

  assets.forEach(asset => {
    buffers.push({
      name: asset.fileName || '',
      type: asset.type || '',
      uri:
        asset.uri && Platform.OS === 'ios'
          ? asset.uri.replace('file://', '')
          : asset.uri || '',
    });
  });

  return buffers;
}
