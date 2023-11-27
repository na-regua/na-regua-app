import {BarbersService, ServicesService} from '@/app/api';
import {IBarberService, IBarberServiceIcon} from '@/app/models';
import {
  AppStatusBar,
  Button,
  Icons,
  Loader,
  MenuItem,
  MenuItemAction,
  Modal,
  Typography,
} from '@/components/atoms';
import {
  BarberServiceModal,
  DeleteServiceModal,
  Header,
} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {RootState} from '@/store/Store';
import {Colors} from '@/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {
  ContainerStyle,
  ContentActionsStyle,
  ContentBackLinkStyle,
  ContentHeaderStyle,
  ContentScrollContentStyle,
  ContentStyle,
  MenuItemRowStyle,
  MenuItemsWrapperStyle,
  styles,
} from './styles';

const BarberServices: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/barber/settings/services'>
> = ({route, navigation}) => {
  const {showContinue} = route.params;
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const barber = useSelector((state: RootState) => state.auth.barber);

  const addServiceModalRef = useRef<BottomSheetModal>(null);
  const editServiceModalRef = useRef<BottomSheetModal>(null);
  const deleteServiceModalRef = useRef<BottomSheetModal>(null);

  const [services, setServices] = useState<IBarberService[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<
    IBarberService | undefined
  >(undefined);
  const [selectedToEdit, setSelectedToEdit] = useState<
    IBarberService | undefined
  >(undefined);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [savingProfile, setSavingProfile] = useState<boolean>(false);
  const [showSet, setShowSet] = useState<string[]>([]);

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const saveProfile = async () => {
    setSavingProfile(true);

    try {
      await BarbersService.completeProfile();

      setSavingProfile(false);
      navigation.navigate('/barber/complete-qr');
    } catch (error) {
      setSavingProfile(false);
    }
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const openAddServiceModal = () => {
    if (addServiceModalRef.current) {
      addServiceModalRef.current.present();
    }
  };

  const openEditServiceModal = (service: IBarberService) => {
    if (editServiceModalRef.current) {
      setSelectedToEdit(service);
      editServiceModalRef.current.present();
    }
  };

  const openDeleteServiceModal = (service: IBarberService) => {
    if (deleteServiceModalRef.current) {
      setSelectedToDelete(service);
      deleteServiceModalRef.current.present();
    }
  };

  const handleShowSet = (id: string) => {
    if (showSet.includes(id)) {
      setShowSet(curr => curr.filter(currId => currId !== id));
    } else {
      setShowSet(curr => [...curr, id]);
    }
  };

  const getServices = useCallback(async () => {
    setLoadingServices(true);

    if (barber) {
      try {
        const {data} = await ServicesService.getServices({
          barberId: barber._id,
        });
        if (data) {
          setLoadingServices(false);
          setServices(data);
        }
      } catch (error) {
        setLoadingServices(false);
        setServices([]);
      }
    }
  }, [barber]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  const getIcon: Record<IBarberServiceIcon, React.ReactNode> = {
    maquina: <Icons.MaquinaIcon width={18} height={20} color="black2" />,
    pente: <Icons.PenteIcon width={20} height={20} color="black2" />,
    navalha: <Icons.NavalhaIcon width={24} height={15} color="black2" />,
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />
      <Header showTitle={false} showBorder />
      <ContentStyle>
        <ContentBackLinkStyle onPress={goBack}>
          <Icons.ArrowLeftIcon width={18} color="black1" />
          <Typography variant="button" color="black1">
            {t('barber.services.goBack')}
          </Typography>
        </ContentBackLinkStyle>
        <ContentHeaderStyle>
          <Typography variant="h5" color="black3">
            {t('barber.services.title')}
          </Typography>
          <Typography variant="body2" color="black1">
            {t('barber.services.subtitle')}
          </Typography>
        </ContentHeaderStyle>
        <ContentScrollContentStyle
          refreshControl={
            <RefreshControl
              refreshing={loadingServices}
              size={14}
              onRefresh={() => {
                getServices();
              }}
              tintColor="transparent"
              colors={['transparent']}
              style={styles.refreshControl}
              progressBackgroundColor="transparent"
            />
          }>
          <MenuItemsWrapperStyle>
            {!loadingServices ? (
              services.map(service => (
                <MenuItemRowStyle key={service._id}>
                  <MenuItem
                    title={service.name}
                    description={`${t('units.money')} ${service.price}`}
                    icon={getIcon[service.icon]}
                    clickable
                    onPress={() => handleShowSet(service._id)}
                    style={styles.menuItem}
                  />
                  {showSet.includes(service._id) && (
                    <>
                      <MenuItemAction
                        theme="primary"
                        onPress={() => openEditServiceModal(service)}>
                        <Icons.EditIcon color="white3" />
                      </MenuItemAction>
                      <MenuItemAction
                        theme="danger"
                        onPress={() => openDeleteServiceModal(service)}>
                        <Icons.DeleteIcon color="white3" />
                      </MenuItemAction>
                    </>
                  )}
                </MenuItemRowStyle>
              ))
            ) : (
              <Loader color={Colors.primary} />
            )}
          </MenuItemsWrapperStyle>
        </ContentScrollContentStyle>
        <ContentActionsStyle>
          <Button
            title={t('barber.services.buttons.add')}
            variant="outlined"
            colorScheme="primary"
            onPress={openAddServiceModal}
          />
          {showContinue && (
            <Button
              title={t('barber.services.buttons.ok')}
              onPress={saveProfile}
              loading={savingProfile}
              disabled={services.length === 0 || loadingServices}
            />
          )}
        </ContentActionsStyle>
        <Modal
          ref={addServiceModalRef}
          title={t('modals.barberService.titles.add')}
          height={414}>
          <BarberServiceModal
            modalRef={addServiceModalRef}
            mode="add"
            onClose={reloadData => reloadData && getServices()}
          />
        </Modal>
        <Modal
          ref={editServiceModalRef}
          title={t('modals.barberService.titles.edit')}
          height={414}
          onClose={() => {
            if (selectedToEdit) {
              handleShowSet(selectedToEdit._id);
              setSelectedToEdit(undefined);
            }
          }}>
          {selectedToEdit && (
            <BarberServiceModal
              modalRef={editServiceModalRef}
              mode="edit"
              initialValues={{
                name: selectedToEdit.name,
                icon: selectedToEdit.icon,
                durationInMinutes: selectedToEdit.durationInMinutes.toString(),
                price: selectedToEdit.price.toString(),
              }}
              serviceID={selectedToEdit._id}
              onClose={reloadData => reloadData && getServices()}
            />
          )}
        </Modal>
        <Modal
          ref={deleteServiceModalRef}
          title={t('modals.deleteService.title')}
          height={194}
          onClose={() => {
            if (selectedToDelete) {
              handleShowSet(selectedToDelete._id);
              setSelectedToDelete(undefined);
            }
          }}>
          {selectedToDelete && (
            <DeleteServiceModal
              modalRef={deleteServiceModalRef}
              service={selectedToDelete}
              onClose={reloadData => reloadData && getServices()}
            />
          )}
        </Modal>
      </ContentStyle>
    </ContainerStyle>
  );
};

export default BarberServices;
