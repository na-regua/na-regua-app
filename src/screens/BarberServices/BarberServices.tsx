import {BarberServicesService} from '@/app/api';
import {IBarberService, IBarberServiceIcon} from '@/app/models';
import {
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
import {useKeyboardVisible} from '@/hooks';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {RootState} from '@/store/Store';
import {Colors} from '@/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';
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

const BarberServices: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigator = useAppNavigation();
  const barber = useSelector((state: RootState) => state.auth.barber);
  const isKeyboardVisible = useKeyboardVisible();

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

    setTimeout(() => {
      setSavingProfile(false);
      navigator.navigate(APP_ROUTES.BARBER_COMPLETE_QR);
    });
  };

  const goBack = () => {
    if (navigator.canGoBack()) {
      navigator.goBack();
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
        const {data} = await BarberServicesService.getServices({
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
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.bgLight} />
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
          <Typography variant="body1" color="black1">
            {t('barber.services.subtitle')}
          </Typography>
        </ContentHeaderStyle>
        <ContentScrollContentStyle>
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
              <Loader
                color={Colors.primary}
                wrapperStyle={styles.loaderWrapper}
              />
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
          <Button
            title={t('barber.services.buttons.ok')}
            onPress={saveProfile}
            loading={savingProfile}
            disabled={services.length === 0 || loadingServices}
          />
        </ContentActionsStyle>
        <Modal
          ref={addServiceModalRef}
          title={t('modals.barberService.titles.add')}
          snapPoints={isKeyboardVisible ? ['88%'] : [452]}>
          <BarberServiceModal
            modalRef={addServiceModalRef}
            mode="add"
            onClose={getServices}
          />
        </Modal>
        <Modal
          ref={editServiceModalRef}
          title={t('modals.barberService.titles.edit')}
          snapPoints={isKeyboardVisible ? ['88%'] : [452]}>
          {selectedToEdit && (
            <BarberServiceModal
              modalRef={editServiceModalRef}
              mode="edit"
              onClose={() => {
                handleShowSet(selectedToEdit._id);
                setSelectedToEdit(undefined);
                getServices();
              }}
              initialValues={{
                name: selectedToEdit.name,
                icon: selectedToEdit.icon,
                durationInMinutes: selectedToEdit.durationInMinutes.toString(),
                price: selectedToEdit.price.toString(),
              }}
              serviceID={selectedToEdit._id}
            />
          )}
        </Modal>
        <Modal
          ref={deleteServiceModalRef}
          title={t('modals.deleteService.title')}
          snapPoints={[230]}>
          {selectedToDelete && (
            <DeleteServiceModal
              modalRef={deleteServiceModalRef}
              onClose={() => {
                handleShowSet(selectedToDelete._id);
                setSelectedToDelete(undefined);
                getServices();
              }}
              service={selectedToDelete}
            />
          )}
        </Modal>
      </ContentStyle>
    </ContainerStyle>
  );
};

export default BarberServices;
