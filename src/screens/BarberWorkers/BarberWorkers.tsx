import {BarbersService} from '@/app/api';
import {IWorker} from '@/app/models';
import {
  Button,
  Icons,
  Loader,
  MenuItem,
  MenuItemAction,
  Modal,
  Typography,
} from '@/components/atoms';
import {AddWorkerModal, Header} from '@/components/molecules';
import {APP_ROUTES, useAppNavigation} from '@/navigation';
import {RootState} from '@/store/Store';
import {Colors} from '@/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {styles} from './styles';

const BarberWorkers: React.FC = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const barber = useSelector((state: RootState) => state.auth.barber);

  const addWorkerModalRef = useRef<BottomSheetModal>(null);

  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [loadingWorkers, setLoadingWorkers] = useState<boolean>(true);

  const [showSet, setShowSet] = useState<string[]>([]);

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const goNext = () => {
    navigation.navigate(APP_ROUTES.BARBER_PRE_SERVICES);
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

  const getWorkers = useCallback(async () => {
    setLoadingWorkers(true);

    if (barber) {
      try {
        const {data} = await BarbersService.getWorkers({barberId: barber._id});

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
    <View style={[insetsStyles, styles.container]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.bgLight} />
      <Header showTitle={false} showBorder />
      <View style={styles.content}>
        <TouchableOpacity style={styles.backlink} onPress={goBack}>
          <Icons.ArrowLeftIcon width={18} color="black1" />
          <Typography variant="button" color="black1">
            {t('barber.workers.goBack')}
          </Typography>
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Typography variant="h5" color="black3">
            {t('barber.workers.title')}
          </Typography>
          <Typography variant="body1" color="black1">
            {t('barber.workers.subtitle')}
          </Typography>
        </View>
        <ScrollView style={styles.scrollContent}>
          {!loadingWorkers ? (
            workers.map(worker => (
              <View style={styles.menuItemWrapper} key={worker._id}>
                <MenuItem
                  title={worker.user.name}
                  description={worker.user.role}
                  avatar={worker.user.avatar}
                  clickable
                  onPress={() => {
                    setShowSet(curr => curr.filter(id => id !== worker._id));
                  }}
                  onLongPress={() => {
                    setShowSet(curr => [...curr, worker._id]);
                  }}
                  style={styles.menuItem}
                />
                {showSet.includes(worker._id) && (
                  <>
                    <MenuItemAction theme="primary">
                      <Icons.EditIcon color="white3" />
                    </MenuItemAction>
                    <MenuItemAction theme="danger">
                      <Icons.RemoveIcon color="white3" />
                    </MenuItemAction>
                  </>
                )}
              </View>
            ))
          ) : (
            <Loader
              color={Colors.primary}
              wrapperStyle={styles.loaderWrapper}
            />
          )}
        </ScrollView>
        <View style={styles.actions}>
          <Button
            variant="outlined"
            colorScheme="primary"
            title={t('barber.workers.buttons.add')}
            onPress={openAddWorkerModal}
          />
          <Button title={t('barber.workers.buttons.save')} onPress={goNext} />
        </View>
        <Modal
          ref={addWorkerModalRef}
          title={t('modals.addWorker.title')}
          snapPoints={['55%', '80%', '100%']}>
          <AddWorkerModal />
        </Modal>
      </View>
    </View>
  );
};

export default BarberWorkers;
