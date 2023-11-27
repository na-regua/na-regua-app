import {WorkersService} from '@/app/api';
import {IWorker} from '@/app/models';
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
import {DeleteWorkerModal, Header, WorkerModal} from '@/components/molecules';
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

const BarberWorkers: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/barber/settings/workers'>
> = ({route, navigation}) => {
  const {showContinue} = route.params;

  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const barber = useSelector((state: RootState) => state.auth.barber);

  const addWorkerModalRef = useRef<BottomSheetModal>(null);
  const editWorkerModalRef = useRef<BottomSheetModal>(null);
  const deleteWorkerModalRef = useRef<BottomSheetModal>(null);

  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<IWorker | undefined>(
    undefined,
  );
  const [selectedToEdit, setSelectedToEdit] = useState<IWorker | undefined>(
    undefined,
  );
  const [loadingWorkers, setLoadingWorkers] = useState(true);
  const [showSet, setShowSet] = useState<string[]>([]);

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const goNext = () => {
    navigation.navigate('/barber/settings/services', {showContinue: true});
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const openAddWorkerModal = () => {
    if (addWorkerModalRef.current) {
      addWorkerModalRef.current.present();
    }
  };

  const addInShowSet = (id: string) => {
    setShowSet(curr => [...curr, id]);
  };

  const removeFromShowSet = (id: string) => {
    if (showSet.includes(id)) {
      setShowSet(curr => curr.filter(currId => currId !== id));
    }
  };

  const handleDeleteWorker = (worker: IWorker) => {
    setSelectedToDelete(worker);

    if (deleteWorkerModalRef.current) {
      deleteWorkerModalRef.current.present();
    }
  };

  const handleEditWorker = (worker: IWorker) => {
    setSelectedToEdit(worker);

    if (editWorkerModalRef.current) {
      editWorkerModalRef.current.present();
    }
  };

  const getWorkers = useCallback(async () => {
    setLoadingWorkers(true);

    if (barber) {
      try {
        const {data} = await WorkersService.getWorkers({barberId: barber._id});

        if (data) {
          setWorkers(data);
          setLoadingWorkers(false);
        }
      } catch (error) {
        setLoadingWorkers(false);
        setWorkers([]);
      }
    }
  }, [barber]);

  useEffect(() => {
    getWorkers();
  }, [getWorkers]);

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />
      <Header showTitle={false} showBorder />
      <ContentStyle>
        <ContentBackLinkStyle onPress={goBack}>
          <Icons.ArrowLeftIcon width={18} color="black1" />
          <Typography variant="button" color="black1">
            {t('barber.workers.goBack')}
          </Typography>
        </ContentBackLinkStyle>
        <ContentHeaderStyle>
          <Typography variant="h5" color="black3">
            {t('barber.workers.title')}
          </Typography>
          <Typography variant="body2" color="black1">
            {t('barber.workers.subtitle')}
          </Typography>
        </ContentHeaderStyle>
        <ContentScrollContentStyle
          refreshControl={
            <RefreshControl
              refreshing={loadingWorkers}
              size={14}
              onRefresh={() => {
                getWorkers();
              }}
              tintColor="transparent"
              colors={['transparent']}
              style={styles.refreshControl}
              progressBackgroundColor="transparent"
            />
          }>
          <MenuItemsWrapperStyle>
            {!loadingWorkers ? (
              workers.map(worker => (
                <MenuItemRowStyle key={worker._id}>
                  <MenuItem
                    title={worker.user.name}
                    description={t(`roles.${worker.user.role}`)}
                    avatar={worker.user.avatar.url}
                    clickable={worker.user.role === 'worker'}
                    onPress={() => addInShowSet(worker._id)}
                    style={styles.menuItem}
                  />
                  {showSet.includes(worker._id) &&
                    worker.user.role === 'worker' && (
                      <>
                        <MenuItemAction
                          theme="primary"
                          onPress={() => handleEditWorker(worker)}>
                          <Icons.EditIcon color="white3" />
                        </MenuItemAction>
                        <MenuItemAction
                          theme="danger"
                          onPress={() => handleDeleteWorker(worker)}>
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
            variant="outlined"
            colorScheme="primary"
            title={t('barber.workers.buttons.add')}
            onPress={openAddWorkerModal}
          />
          {showContinue && (
            <Button
              title={t('barber.workers.buttons.ok')}
              onPress={goNext}
              disabled={workers.length === 0 || loadingWorkers}
            />
          )}
        </ContentActionsStyle>
        <Modal
          ref={addWorkerModalRef}
          title={t('modals.worker.titles.add')}
          height={468}>
          <WorkerModal
            mode="add"
            modalRef={addWorkerModalRef}
            onClose={reloadData => {
              if (reloadData) {
                getWorkers();
              }
            }}
          />
        </Modal>
        <Modal
          ref={editWorkerModalRef}
          autoSize
          height={410}
          title={t('modals.worker.titles.edit')}
          onClose={() => {
            if (selectedToEdit) {
              removeFromShowSet(selectedToEdit._id);
              setSelectedToEdit(undefined);
            }
          }}>
          {selectedToEdit && (
            <WorkerModal
              mode="edit"
              modalRef={editWorkerModalRef}
              onClose={reloadData => {
                if (reloadData) {
                  getWorkers();
                }
              }}
              initialValues={{
                name: selectedToEdit.user.name,
                email: selectedToEdit.user.email,
                phone: selectedToEdit.user.phone,
              }}
              initialAvatar={selectedToEdit.user.avatar.url}
              workerID={selectedToEdit._id}
            />
          )}
        </Modal>
        <Modal
          ref={deleteWorkerModalRef}
          title={t('modals.deleteWorker.title')}
          height={198}
          onClose={() => {
            if (selectedToDelete) {
              removeFromShowSet(selectedToDelete._id);
              setSelectedToDelete(undefined);
            }
          }}>
          {selectedToDelete && (
            <DeleteWorkerModal
              onClose={reloadData => {
                removeFromShowSet(selectedToDelete._id);
                setSelectedToDelete(undefined);
                if (reloadData) {
                  getWorkers();
                }
              }}
              worker={selectedToDelete}
              modalRef={deleteWorkerModalRef}
            />
          )}
        </Modal>
      </ContentStyle>
    </ContainerStyle>
  );
};

export default BarberWorkers;
