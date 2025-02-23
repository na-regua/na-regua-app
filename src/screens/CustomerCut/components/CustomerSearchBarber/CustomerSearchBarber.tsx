import {BarbersService, emitErrorNotification} from '@/app/api';
import {IBarber, PaginatedFilter} from '@/app/models';
import {BarberInfoCard, Box, Button, Icons, Loader} from '@/components/atoms';
import {AppDispatch} from '@/store/Store';
import {CutActions} from '@/store/slicers';
import {Colors} from '@/theme';
import {AxiosError} from 'axios';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  TextInput,
  ViewStyle,
} from 'react-native';
import {Portal} from 'react-native-portalize';
import {FadeInUp, FadeOut} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {CodeInputStyled} from '../../styles';
import {FavoriteItemStyled} from '../CustomerSelectBarber/styles';
import {CSBStyles, FlatListStyled, TouchableWFStyled} from './styles';

interface CustomerSearchBarberProps {
  dismiss: () => void;
}

const CustomerSearchBarber: React.FC<CustomerSearchBarberProps> = ({
  dismiss,
}) => {
  const insets = useSafeAreaInsets();
  const insetsStyle: ViewStyle = {
    paddingTop: insets.top + 18,
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
    }, 200);
  };

  const searchRef = useRef<TextInput>(null);

  const fetchBarbers = async () => {
    try {
      setLoading(true);

      const {data} = await BarbersService.getBarbers(
        debouncedInputValue,
        pagination,
      );

      console.log('data', data.total);

      const {content, total} = data;

      setTotalItems(total);
      setPagination(curr => ({
        ...curr,
      }));

      if (content.length > 0) {
        setBarbers(content);
      }

      if (content.length === 0) {
        setBarbers([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        emitErrorNotification(error);
      }
    }
  };

  const fetchNextList = () => {
    if (hasNext) {
      setPagination(curr => ({
        ...curr,
        limit: curr.limit + curr.limit,
      }));

      fetchBarbers();
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
    fetchBarbers();
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
      <TouchableWFStyled
        onPress={() => {
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }
        }}>
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
              style={CSBStyles.dismiss}
            />
          </Box>

          <FlatListStyled
            as={FlatList<IBarber>}
            data={barbers}
            showsVerticalScrollIndicator={false}
            renderItem={renderFavorite}
            onEndReached={fetchNextList}
            ListFooterComponent={
              <Box alignItems="center">
                {loading && <Loader size="100" color={Colors.main} />}
              </Box>
            }
          />
        </Box>
      </TouchableWFStyled>
    </Portal>
  );
};

export {CustomerSearchBarber};
