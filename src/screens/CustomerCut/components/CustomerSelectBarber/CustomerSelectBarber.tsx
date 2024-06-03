import {BarbersService, UserService} from '@/app/api';
import {IBarber} from '@/app/models';
import {BarberInfoCard, Button, Icons, Typography} from '@/components/atoms';
import SearchIcon from '@/components/atoms/Icons/SearchIcon/SearchIcon';
import {useAppNavigation} from '@/navigation';
import {CutActions, createNotification} from '@/store/slicers';
import {AxiosError} from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {FadeInDown} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {
  AvoidKeyboardStyled,
  CodeInputStyled,
  DropdownItemStyled,
  DropdownMenuStyled,
  DropdownWrapperStyled,
  PageCardGroupStyled,
  PageCardRowStyled,
  PageCardTitleStyled,
  SearchButtonStyled,
  ShareQrButtonContentStyled,
  menuShadow,
} from '../../styles';
import {FavoriteItemStyled, FavoritesScrollStyled} from './styles';

const CustomerSelectBarber = () => {
  const {t} = useTranslation();
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);

  const [barbers, setBarbers] = useState<IBarber[]>([]);
  const [favorites, setFavorites] = useState<IBarber[]>([]);

  const [menuHeight, setMenuHeight] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigation = useAppNavigation();
  const dispatch = useDispatch();

  const canSearch = useMemo(() => search.length > 0, [search]);

  const onSearch = async () => {
    if (!canSearch) {
      return;
    }

    try {
      setLoading(true);

      const {data} = await BarbersService.getBarbers(search);

      if (data) {
        setBarbers(data);
        setShowDropdown(true);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const showSelectedModal = (barber: IBarber) => {
    dispatch(CutActions.setCutSelectedBarber(barber));
    dispatch(CutActions.setShowSelectedModal(true));
  };

  const goToQrScanner = () => {
    navigation.navigate('/customer/qr-scanner');
  };

  const fetchFavorites = async () => {
    try {
      const {data} = await UserService.getFavoriteBarbers();

      if (data) {
        setFavorites(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'get_user_favorites',
              message: `errors.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }

        if (showDropdown) {
          closeDropdown();
        }
      }}>
      <AvoidKeyboardStyled>
        <PageCardTitleStyled>
          <Typography variant="h4">{'customer.cut.select.title'}</Typography>
          <Typography variant="body2" color="black2">
            {'customer.cut.select.subtitle'}
          </Typography>
        </PageCardTitleStyled>
        <PageCardRowStyled>
          <CodeInputStyled
            onChangeText={text => {
              setSearch(text);
            }}
            value={search}
            label="customer.cut.fields.search"
            placeholder={t('customer.cut.fields.code')}
            blurOnSubmit
            onSubmitEditing={() => {
              if (canSearch) {
                onSearch();
              }
            }}
            returnKeyType={'search'}
            textContentType="none"
          />
          <SearchButtonStyled
            customContent={<SearchIcon color="primary" disabled />}
            onPress={onSearch}
            disabled={!canSearch}
            loading={loading}
          />

          {showDropdown && barbers.length > 0 && (
            <DropdownWrapperStyled
              style={menuShadow}
              gap={menuHeight}
              entering={FadeInDown}>
              <DropdownMenuStyled
                onScroll={event => {
                  event.stopPropagation();
                }}
                onLayout={event => {
                  setMenuHeight(event.nativeEvent.layout.height);
                }}
                scrollEventThrottle={16}>
                {barbers.map((barber, index) => {
                  const isFirst = index === 0;
                  const isLast = index === barbers.length - 1;

                  return (
                    <DropdownItemStyled
                      first={isFirst}
                      last={isLast}
                      onPress={() => {
                        showSelectedModal(barber);
                      }}
                      key={index}>
                      <BarberInfoCard
                        barber={barber}
                        showInfo={false}
                        avatarRadius={6}
                      />
                    </DropdownItemStyled>
                  );
                })}
              </DropdownMenuStyled>
            </DropdownWrapperStyled>
          )}
        </PageCardRowStyled>

        <Button
          customContent={
            <ShareQrButtonContentStyled>
              <Icons.QRIcon color="main" disabled />
              <Typography variant="button" color="black3">
                {'customer.home.buttons.readQr'}
              </Typography>
            </ShareQrButtonContentStyled>
          }
          variant="ghost"
          onPress={goToQrScanner}
        />
        <PageCardGroupStyled gap={12}>
          <Typography variant="body1">
            {'customer.cut.select.favorites'}
          </Typography>
          <FavoritesScrollStyled>
            {favorites.map((fav, index) => (
              <FavoriteItemStyled
                key={index}
                onPress={() => showSelectedModal(fav)}>
                <BarberInfoCard
                  barber={fav}
                  showInfo={false}
                  avatarRadius={6}
                />
              </FavoriteItemStyled>
            ))}
          </FavoritesScrollStyled>
        </PageCardGroupStyled>
      </AvoidKeyboardStyled>
    </TouchableWithoutFeedback>
  );
};

export {CustomerSelectBarber};
