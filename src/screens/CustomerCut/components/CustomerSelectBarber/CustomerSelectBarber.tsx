import {UserService} from '@/app/api';
import {IBarber} from '@/app/models';
import {
  BarberInfoCard,
  Button,
  Icons,
  Modal,
  Typography,
} from '@/components/atoms';
import {useAppNavigation} from '@/navigation';
import {CutActions, createNotification} from '@/store/slicers';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {AxiosError} from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  PageCardGroupStyled,
  PageCardRowStyled,
  PageCardTitleStyled,
  ShareQrButtonContentStyled,
} from '../../styles';
import {CustomerSearchBarber} from '../CustomerSearchBarber/CustomerSearchBarber';
import {
  FavoriteItemStyled,
  FavoritesScrollStyled,
  SearchBarberButtonStyled,
} from './styles';

const CustomerSelectBarber: React.FC = () => {
  const searchBarberModalRef = useRef<BottomSheetModal>(null);

  const [favorites, setFavorites] = useState<IBarber[]>([]);

  const navigation = useAppNavigation();
  const dispatch = useDispatch();

  const showSearchBarberModal = () => {
    searchBarberModalRef.current?.present();
  };

  const closeSearchBarberModal = () => {
    searchBarberModalRef.current?.dismiss();
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
      }}>
      <>
        <PageCardTitleStyled>
          <Typography variant="h4">{'customer.cut.select.title'}</Typography>
          <Typography variant="body2" color="black2">
            {'customer.cut.select.subtitle'}
          </Typography>
        </PageCardTitleStyled>
        {/* Search */}
        <PageCardRowStyled>
          <SearchBarberButtonStyled onPress={showSearchBarberModal}>
            <Typography variant="caption" color="placeholder" weight="medium">
              {'customer.cut.fields.code'}
            </Typography>
          </SearchBarberButtonStyled>
        </PageCardRowStyled>
        <Modal
          ref={searchBarberModalRef}
          snapPoints={['100%']}
          enablePanDownToClose={false}>
          <CustomerSearchBarber dismiss={closeSearchBarberModal} />
        </Modal>
        {/* QR Scan */}
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
        {/* Favorites */}
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
      </>
    </TouchableWithoutFeedback>
  );
};

export {CustomerSelectBarber};
