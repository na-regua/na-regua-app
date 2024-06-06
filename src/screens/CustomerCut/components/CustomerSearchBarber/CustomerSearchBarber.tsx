import {BarbersService} from '@/app/api';
import {IBarber, PaginatedFilter} from '@/app/models';
import {
  BarberInfoCard,
  Box,
  Button,
  Icons,
  Loader,
  Typography,
} from '@/components/atoms';
import {AppDispatch} from '@/store/Store';
import {CutActions, createNotification} from '@/store/slicers';
import {AxiosError} from 'axios';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  TextInput,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {Portal} from 'react-native-portalize';
import {FadeInUp, FadeOut} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {CodeInputStyled} from '../../styles';
import {FavoriteItemStyled} from '../CustomerSelectBarber/styles';
import {FlatListStyled} from './styles';
import {Colors} from '@/theme';

interface CustomerSearchBarberProps {
  dismiss: () => void;
}

const CustomerSearchBarber: React.FC<CustomerSearchBarberProps> = ({
  dismiss,
}) => {
  const insets = useSafeAreaInsets();
  const insetsStyle: ViewStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  };
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [barbers, setBarbers] = useState<IBarber[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // infinite scroll
  const [totalItems, setTotalItems] = useState(0);
  const [pagination, setPagination] = useState<PaginatedFilter>({
    limit: 10,
    offset: 0,
  });

  const hasNext = useMemo(
    () => barbers.length < totalItems,
    [barbers, totalItems],
  );

  // way to hide the component before modal close animation
  const [showContent, setShowContent] = useState(true);
  const handleDismiss = () => {
    setShowContent(false);
    setSearch('');
    setBarbers([]);
    setLoading(false);

    setTimeout(() => {
      dismiss();
    }, 100);
  };

  const searchRef = useRef<TextInput>(null);

  const onSearch = async () => {
    try {
      setLoading(true);

      const {data} = await BarbersService.getBarbers(debouncedInputValue);

      const {content, total, limit, offset} = data;

      console.log({limit, offset, total});

      setTotalItems(total);

      if (content) {
        setBarbers(content);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'list_barbers',
              message: `errors.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  const showSelectedModal = (barber: IBarber) => {
    handleDismiss();

    setTimeout(() => {
      dispatch(CutActions.setCutSelectedBarber(barber));
      dispatch(CutActions.setShowSelectedModal(true));
    }, 100);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(search);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  const renderFavorite = (item: ListRenderItemInfo<IBarber>) => (
    <FavoriteItemStyled onPress={() => showSelectedModal(item.item)}>
      <BarberInfoCard barber={item.item} showInfo={false} avatarRadius={6} />
    </FavoriteItemStyled>
  );

  if (!showContent) {
    return null;
  }

  return (
    <Portal>
      <TouchableWithoutFeedback
        onPress={() => {
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }
        }}
        style={{flex: 1, zIndex: 5}}>
        <Box
          style={insetsStyle}
          alignSelf="stretch"
          flex={1}
          position="absolute"
          width={'100%'}
          height={'100%'}
          padding={18}
          gap={18}
          entering={FadeInUp.delay(300)}
          exiting={FadeOut}>
          <Box
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={18}
            paddings={{top: 18}}>
            <CodeInputStyled
              inputRef={searchRef}
              onChangeText={text => {
                setSearch(text);
              }}
              onChange={() => {}}
              label="customer.cut.fields.search"
              placeholder={t('customer.cut.fields.code')}
              blurOnSubmit
              returnKeyType={'search'}
              textContentType="none"
              autoCapitalize="none"
            />
            <Button
              onPress={handleDismiss}
              customContent={
                <Icons.CloseIcon
                  color="danger"
                  disabled
                  width={20}
                  height={20}
                />
              }
              variant="ghost"
              colorScheme="danger"
              style={{
                width: 44,
                height: 44,
              }}
            />
          </Box>
          <FlatListStyled
            data={barbers}
            renderItem={item =>
              renderFavorite(item as ListRenderItemInfo<IBarber>)
            }
            as={FlatList}
            ListFooterComponent={
              <Box alignItems="center">
                {loading && <Loader size="100" color={Colors.main} />}
              </Box>
            }
          />
        </Box>
      </TouchableWithoutFeedback>
    </Portal>
  );
};

export {CustomerSearchBarber};
